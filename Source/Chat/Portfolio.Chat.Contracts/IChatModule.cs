using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Contracts
{
    public interface IChatModule
    {
        /// <summary>
        /// Brings the assistant's context in IntegratorAI up to date with the portfolio data, for every language.
        /// </summary>
        Task<IEnumerable<ChatContextSyncDto>> SynchronizeContexts(CancellationToken cancellationToken = default);

        /// <summary>
        /// Starts a conversation: sends the first message to the assistant that speaks the language of the current
        /// request (<c>Accept-Language</c>) and returns its answer as it is written.
        /// </summary>
        Task<ChatStreamDto> StartCompletion(string prompt, CancellationToken cancellationToken = default);

        /// <summary>Adds a message to a conversation that was started earlier and returns the answer as it is written.</summary>
        Task<ChatStreamDto> ContinueCompletion(Guid completionId, string prompt, CancellationToken cancellationToken = default);
    }
}
