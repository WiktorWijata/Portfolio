using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application;

/// <summary>The tools the chat assistant can call. Fixed for the lifetime of the application.</summary>
public interface IChatToolRegistry
{
    IReadOnlyList<ChatToolDto> Tools { get; }
}
