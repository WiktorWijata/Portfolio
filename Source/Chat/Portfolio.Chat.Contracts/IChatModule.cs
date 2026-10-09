using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Contracts
{
    public interface IChatModule
    {
        /// <summary>All controller actions marked with <c>[ChatTool]</c>, described for the model.</summary>
        Task<IEnumerable<ChatToolDto>> GetTools(CancellationToken cancellationToken = default);

        /// <summary>
        /// Runs a tool and returns its result as JSON. The data is resolved for the current request, so the
        /// response language follows the request's <c>Accept-Language</c> header.
        /// </summary>
        /// <param name="toolName">Name given in <c>[ChatTool]</c>.</param>
        /// <param name="argumentsJson">JSON object with the arguments chosen by the model; may be null or empty.</param>
        Task<string> ExecuteTool(string toolName, string argumentsJson, CancellationToken cancellationToken = default);

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
