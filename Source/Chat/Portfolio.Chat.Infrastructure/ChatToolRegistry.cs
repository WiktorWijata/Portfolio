using System.ComponentModel;
using System.Reflection;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Portfolio.Chat.Contracts.Models;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.Infrastructure;

/// <summary>
/// Finds the controller actions marked with <see cref="ChatToolAttribute"/> and checks that each is a valid tool.
/// It is built when the application starts, so a misconfigured tool fails the startup instead of a chat request.
/// </summary>
public sealed partial class ChatToolRegistry
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
        var methods = types
            .Where(t => !t.IsAbstract && typeof(ControllerBase).IsAssignableFrom(t))
            .SelectMany(t => t.GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly))
            .Select(m => (Method: m, Attribute: m.GetCustomAttribute<ChatToolAttribute>()))
            .Where(x => x.Attribute is not null);

        foreach (var (method, attribute) in methods)
        {
            var tool = Register(method, attribute!);

            if (!_tools.TryAdd(tool.Definition.Name, tool))
            {
                throw new InvalidOperationException(
                    $"Chat tool name '{tool.Definition.Name}' is used by both {Describe(_tools[tool.Definition.Name].Method)} and {Describe(method)}.");
            }
        }
    }

    public static ChatToolRegistry FromAssemblies(IEnumerable<Assembly> assemblies)
        => new(assemblies.SelectMany(a => a.GetTypes()));

    public IReadOnlyList<ChatToolDto> Definitions => _tools.Values.Select(t => t.Definition).ToList();

    public bool TryGet(string name, out RegisteredChatTool tool) => _tools.TryGetValue(name, out tool!);

    private static RegisteredChatTool Register(MethodInfo method, ChatToolAttribute attribute)
    {
        var where = Describe(method);

        if (!ToolNamePattern().IsMatch(attribute.Name))
        {
            throw new InvalidOperationException(
                $"Chat tool name '{attribute.Name}' on {where} must be lowercase letters, digits and underscores, starting with a letter.");
        }

        if (string.IsNullOrWhiteSpace(attribute.Description))
        {
            throw new InvalidOperationException($"Chat tool '{attribute.Name}' on {where} needs a description for the model.");
        }

        var httpMethods = method.GetCustomAttributes<HttpMethodAttribute>().ToList();
        if (httpMethods.Count == 0 || httpMethods.Any(a => a is not HttpGetAttribute))
        {
            throw new InvalidOperationException($"Chat tool '{attribute.Name}' on {where} must be a read-only [HttpGet] action.");
        }

        if (!ReturnsActionResult(method.ReturnType))
        {
            throw new InvalidOperationException(
                $"Chat tool '{attribute.Name}' on {where} must return Task<IActionResult> or Task<ActionResult<T>>.");
        }

        var parameters = new List<ChatToolParameterDto>();
        foreach (var parameter in method.GetParameters())
        {
            if (parameter.ParameterType == typeof(CancellationToken))
            {
                continue;
            }

            var underlying = Nullable.GetUnderlyingType(parameter.ParameterType) ?? parameter.ParameterType;
            if (!SchemaTypes.TryGetValue(underlying, out var schemaType))
            {
                throw new InvalidOperationException(
                    $"Chat tool '{attribute.Name}' on {where}: parameter '{parameter.Name}' has unsupported type {parameter.ParameterType.Name}. " +
                    "Use string, int, long, double, decimal or bool.");
            }

            var description = parameter.GetCustomAttribute<DescriptionAttribute>()?.Description ?? string.Empty;
            parameters.Add(new ChatToolParameterDto
            {
                Name = parameter.Name!,
                Type = schemaType,
                Description = description,
                Required = !parameter.HasDefaultValue,
            });
        }

        var definition = new ChatToolDto
        {
            Name = attribute.Name,
            Description = attribute.Description,
            Parameters = parameters.ToArray(),
        };
        return new RegisteredChatTool(definition, method.DeclaringType!, method);
    }

    private static bool ReturnsActionResult(Type returnType)
    {
        if (!returnType.IsGenericType || returnType.GetGenericTypeDefinition() != typeof(Task<>))
        {
            return false;
        }

        var result = returnType.GetGenericArguments()[0];
        return result == typeof(IActionResult)
            || (result.IsGenericType && result.GetGenericTypeDefinition() == typeof(ActionResult<>));
    }

    private static string Describe(MethodInfo method) => $"{method.DeclaringType!.Name}.{method.Name}";

    [GeneratedRegex("^[a-z][a-z0-9_]{0,63}$")]
    private static partial Regex ToolNamePattern();
}

public sealed record RegisteredChatTool(ChatToolDto Definition, Type ControllerType, MethodInfo Method);
