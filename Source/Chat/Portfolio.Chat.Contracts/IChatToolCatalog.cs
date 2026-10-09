using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Portfolio.Chat.Contracts
{
    public interface IChatToolCatalog
    {
        /// <summary>All controller actions marked with <c>[ChatTool]</c>.</summary>
        IReadOnlyList<ChatToolDefinition> GetTools();

        /// <summary>
        /// Runs a tool and returns its result as JSON. The data is resolved for the current request, so the
        /// response language follows the request's <c>Accept-Language</c> header.
        /// </summary>
        /// <param name="toolName">Name given in <c>[ChatTool]</c>.</param>
        /// <param name="argumentsJson">JSON object with the arguments chosen by the model; may be null or empty.</param>
        /// <exception cref="System.Exception">Unknown tool, invalid arguments or a failed call; the implementation throws a
        /// <c>ChatToolException</c> (BuildingBlocks.Application) whose message is safe to return to the model.</exception>
        Task<string> ExecuteAsync(string toolName, string argumentsJson, CancellationToken cancellationToken = default);
    }
}
