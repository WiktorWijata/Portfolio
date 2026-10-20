namespace Portfolio.Chat.Application;

/// <summary>The tools the chat assistant can call. Fixed for the lifetime of the application.</summary>
public interface IChatToolRegistry
{
    IReadOnlyList<ChatTool> Tools { get; }
}

/// <summary>A tool by name. The description for the model depends on the language, see <see cref="ChatInstructions.Tools"/>.</summary>
/// <param name="Name">The name the model calls.</param>
/// <param name="Parameters">The arguments the model passes; empty for a tool that takes none.</param>
public record ChatTool(string Name, IReadOnlyList<ChatToolParameter> Parameters)
{
    /// <summary>The tool has an argument the caller must provide, so it cannot be answered in advance.</summary>
    public bool NeedsArguments => Parameters.Any(p => p.Required);
}

/// <param name="Type">JSON schema type: <c>string</c>, <c>integer</c>, <c>number</c> or <c>boolean</c>.</param>
public sealed record ChatToolParameter(string Name, string Type, string Description, bool Required);
