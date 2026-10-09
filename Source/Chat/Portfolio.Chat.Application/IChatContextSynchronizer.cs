using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application;

/// <summary>Brings the assistant's context in IntegratorAI up to date with the portfolio data. Implemented by the infrastructure layer.</summary>
public interface IChatContextSynchronizer
{
    Task<IReadOnlyList<ChatContextSyncDto>> SynchronizeAsync(CancellationToken cancellationToken = default);
}
