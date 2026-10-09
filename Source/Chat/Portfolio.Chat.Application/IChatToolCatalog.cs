using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application;

/// <summary>Where the tools come from and how they run. Implemented by the infrastructure layer.</summary>
public interface IChatToolCatalog
{
    IReadOnlyList<ChatToolDto> GetTools();

    /// <exception cref="ChatToolException">Unknown tool, invalid arguments or a failed call.</exception>
    Task<string> ExecuteAsync(string toolName, string? argumentsJson, CancellationToken cancellationToken = default);
}
