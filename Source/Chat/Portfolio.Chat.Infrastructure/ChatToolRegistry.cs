using System.ComponentModel;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Portfolio.Chat.Application;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.Infrastructure;

/// <summary>
/// Finds the controller actions marked with <see cref="ChatToolAttribute"/> and checks that each is a read-only
/// action with a unique name and arguments of simple types. It is built when the application starts, so a misconfigured tool fails the startup
/// instead of a chat request.
/// </summary>
public sealed class ChatToolRegistry : IChatToolRegistry
{
    private static readonly Dictionary<Type, string> SchemaTypes = new()
    {
        [typeof(string)] = "string",
        [typeof(int)] = "integer",
        [typeof(long)] = "integer",
        [typeof(double)] = "number",
        [typeof(decimal)] = "number",
        [typeof(bool)] = "boolean",
    };

    private readonly Dictionary<string, RegisteredChatTool> _tools = new(StringComparer.Ordinal);

    public ChatToolRegistry(IEnumerable<Type> types)
    {
        // Actions inherited from a base controller count too, and are run on the controller that inherits them.
        var methods = types
            .Where(t => !t.IsAbstract && typeof(ControllerBase).IsAssignableFrom(t))
            .SelectMany(t => t.GetMethods(BindingFlags.Public | BindingFlags.Instance).Select(m => (Controller: t, Method: m)))
            .Select(x => (x.Controller, x.Method, Attribute: x.Method.GetCustomAttribute<ChatToolAttribute>()))
            .Where(x => x.Attribute is not null);

        foreach (var (controller, method, attribute) in methods)
        {
            var name = attribute!.Name;

            var httpMethods = method.GetCustomAttributes<HttpMethodAttribute>().ToList();
            if (httpMethods.Count == 0 || httpMethods.Any(a => a is not HttpGetAttribute))
            {
                throw new InvalidOperationException($"Chat tool '{name}' on {Describe(controller, method)} must be a read-only [HttpGet] action.");
            }

            var parameters = Parameters(name, controller, method);

            if (!_tools.TryAdd(name, new RegisteredChatTool(name, parameters, controller, method)))
            {
                var other = _tools[name];
                throw new InvalidOperationException($"Chat tool name '{name}' is used by both {Describe(other.ControllerType, other.Method)} and {Describe(controller, method)}.");
            }
        }

        Tools = _tools.Values.ToList<ChatTool>();
    }

    public static ChatToolRegistry FromAssemblies(IEnumerable<Assembly> assemblies)
        => new(assemblies.SelectMany(a => a.GetTypes()));

    public IReadOnlyList<ChatTool> Tools { get; }

    public bool TryGet(string name, out RegisteredChatTool tool) => _tools.TryGetValue(name, out tool!);

    private static List<ChatToolParameter> Parameters(string toolName, Type controller, MethodInfo method)
    {
        var parameters = new List<ChatToolParameter>();

        foreach (var parameter in method.GetParameters().Where(p => p.ParameterType != typeof(CancellationToken)))
        {
            var underlying = Nullable.GetUnderlyingType(parameter.ParameterType) ?? parameter.ParameterType;
            if (!SchemaTypes.TryGetValue(underlying, out var schemaType))
            {
                throw new InvalidOperationException(
                    $"Chat tool '{toolName}' on {Describe(controller, method)}: parameter '{parameter.Name}' has unsupported type {parameter.ParameterType.Name}. " +
                    "Use string, int, long, double, decimal or bool.");
            }

            var description = parameter.GetCustomAttribute<DescriptionAttribute>()?.Description ?? string.Empty;
            parameters.Add(new ChatToolParameter(parameter.Name!, schemaType, description, Required: !parameter.HasDefaultValue));
        }

        return parameters;
    }

    private static string Describe(Type controller, MethodInfo method) => $"{controller.Name}.{method.Name}";
}

/// <summary>A tool together with what it takes to run it: the controller it lives on and its action.</summary>
public sealed record RegisteredChatTool(string Name, IReadOnlyList<ChatToolParameter> Parameters, Type ControllerType, MethodInfo Method) : ChatTool(Name, Parameters);
