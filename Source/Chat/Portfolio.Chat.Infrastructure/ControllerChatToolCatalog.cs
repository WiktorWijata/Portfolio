using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Application;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Infrastructure;

/// <summary>
/// Runs chat tools by calling the controller action behind them, so the model receives exactly the data the
/// frontend gets from the same endpoint. Scoped: the controller and its dependencies live in the request scope,
/// which is also what resolves the response language.
/// </summary>
public sealed class ControllerChatToolCatalog : IChatToolCatalog
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    };

    private readonly ChatToolRegistry _registry;
    private readonly IServiceProvider _services;

    public ControllerChatToolCatalog(ChatToolRegistry registry, IServiceProvider services)
    {
        _registry = registry;
        _services = services;
    }

    public IReadOnlyList<ChatToolDto> GetTools() => _registry.Definitions;

    public async Task<string> ExecuteAsync(string toolName, string? argumentsJson, CancellationToken cancellationToken = default)
    {
        if (!_registry.TryGet(toolName, out var tool))
        {
            throw new ChatToolException($"Unknown tool '{toolName}'.");
        }

        var arguments = Bind(tool.Method, ParseArguments(argumentsJson), cancellationToken);
        var controller = ActivatorUtilities.CreateInstance(_services, tool.ControllerType);

        IActionResult result;
        try
        {
            var task = (Task)tool.Method.Invoke(controller, arguments)!;
            await task;
            var value = task.GetType().GetProperty(nameof(Task<object>.Result))!.GetValue(task);
            result = value is IConvertToActionResult convertible ? convertible.Convert() : (IActionResult)value!;
        }
        catch (TargetInvocationException exception) when (exception.InnerException is not null)
        {
            throw new ChatToolException($"Tool '{toolName}' failed.", exception.InnerException);
        }

        return Serialize(toolName, result);
    }

    private static JsonElement? ParseArguments(string? argumentsJson)
    {
        if (string.IsNullOrWhiteSpace(argumentsJson))
        {
            return null;
        }

        try
        {
            using var document = JsonDocument.Parse(argumentsJson);
            return document.RootElement.ValueKind switch
            {
                JsonValueKind.Object => document.RootElement.Clone(),
                JsonValueKind.Null => null,
                _ => throw new ChatToolException("Tool arguments must be a JSON object."),
            };
        }
        catch (JsonException exception)
        {
            throw new ChatToolException("Tool arguments are not valid JSON.", exception);
        }
    }

    private static object?[] Bind(MethodInfo method, JsonElement? arguments, CancellationToken cancellationToken)
    {
        var parameters = method.GetParameters();
        var values = new object?[parameters.Length];

        for (var i = 0; i < parameters.Length; i++)
        {
            var parameter = parameters[i];

            if (parameter.ParameterType == typeof(CancellationToken))
            {
                values[i] = cancellationToken;
                continue;
            }

            var element = FindArgument(arguments, parameter.Name!);
            if (element is { ValueKind: not JsonValueKind.Null })
            {
                try
                {
                    values[i] = element.Value.Deserialize(parameter.ParameterType, JsonOptions);
                }
                catch (JsonException exception)
                {
                    throw new ChatToolException($"Argument '{parameter.Name}' has an invalid value.", exception);
                }
            }
            else if (parameter.HasDefaultValue)
            {
                values[i] = parameter.DefaultValue;
            }
            else
            {
                throw new ChatToolException($"Missing required argument '{parameter.Name}'.");
            }
        }

        return values;
    }

    private static JsonElement? FindArgument(JsonElement? arguments, string name)
    {
        if (arguments is null)
        {
            return null;
        }

        foreach (var property in arguments.Value.EnumerateObject())
        {
            if (string.Equals(property.Name, name, StringComparison.OrdinalIgnoreCase))
            {
                return property.Value;
            }
        }

        return null;
    }

    private static string Serialize(string toolName, IActionResult result)
    {
        switch (result)
        {
            case ObjectResult { StatusCode: null or (>= 200 and < 300) } objectResult:
                return JsonSerializer.Serialize(objectResult.Value, JsonOptions);
            case ObjectResult objectResult:
                throw new ChatToolException($"Tool '{toolName}' returned status {objectResult.StatusCode}.");
            case StatusCodeResult { StatusCode: >= 200 and < 300 }:
                return "null";
            case StatusCodeResult statusCodeResult:
                throw new ChatToolException($"Tool '{toolName}' returned status {statusCodeResult.StatusCode}.");
            default:
                throw new ChatToolException($"Tool '{toolName}' returned an unsupported result type.");
        }
    }
}
