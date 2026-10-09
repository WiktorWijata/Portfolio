namespace Portfolio.Chat.Application;

/// <summary>The tools the chat assistant can call. Fixed for the lifetime of the application.</summary>
public interface IChatToolRegistry
{
    IReadOnlyList<ChatTool> Tools { get; }
}

/// <summary>A tool by name. The description for the model depends on the language, see <see cref="ChatInstructions.Tools"/>.</summary>
/// <param name="Name">The name the model calls.</param>
/// <param name="NeedsArguments">The tool has an argument the caller must provide, so it cannot be answered in advance.</param>
public record ChatTool(string Name, bool NeedsArguments);
