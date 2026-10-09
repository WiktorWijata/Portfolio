using System.Text.Json;
using IntegratorAI.Api.Contracts.Context.Models;

namespace Portfolio.Chat.Application;

/// <summary>What the assistant is told, in one language: its role, rules, examples and the descriptions of its tools. Loaded from the embedded <c>instructions.*.json</c> files.</summary>
public sealed class ChatInstructions
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public required string Name { get; init; }
    public required string SystemRole { get; init; }

    /// <summary>Opens the data part of the context, in front of the tool results.</summary>
    public required string DataIntro { get; init; }

    public required string DecisionPolicy { get; init; }
    public required string[] OperatingRules { get; init; }
    public required string OutputFormat { get; init; }
    public required Example[] Examples { get; init; }

    /// <summary>What each tool returns and when to use it, as the model reads it, by the name of the tool.</summary>
    public required Dictionary<string, string> Tools { get; init; }

    /// <summary>Reads the instructions for a language from the embedded JSON files.</summary>
    public static ChatInstructions For(string languageCode)
    {
        var resource = $"Portfolio.Chat.Application.Resources.instructions.{languageCode.ToLowerInvariant()}.json";

        using var stream = typeof(ChatInstructions).Assembly.GetManifestResourceStream(resource)
            ?? throw new InvalidOperationException($"There is no assistant instructions for language '{languageCode}' (missing resource {resource}).");

        return JsonSerializer.Deserialize<ChatInstructions>(stream, JsonOptions)
            ?? throw new InvalidOperationException($"The assistant instructions resource {resource} is empty.");
    }

    public string DescribeTool(string toolName, string languageCode)
        => Tools.TryGetValue(toolName, out var description) && !string.IsNullOrWhiteSpace(description)
            ? description
            : throw new InvalidOperationException($"The tool '{toolName}' has no description for language '{languageCode}' in instructions.{languageCode.ToLowerInvariant()}.json.");
}
