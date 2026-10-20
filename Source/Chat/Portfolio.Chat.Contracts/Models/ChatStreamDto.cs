using System;
using System.Collections.Generic;

namespace Portfolio.Chat.Contracts.Models
{
    /// <summary>
    /// An answer of the assistant that is still being written. It has to be enumerated to the end, or disposed,
    /// because it holds the connection to IntegratorAI open.
    /// </summary>
    public class ChatStreamDto
    {
        /// <summary>The conversation, to be sent back by the client to continue it.</summary>
        public Guid CompletionId { get; set; }

        /// <summary>The answer in pieces, in the order the model produced them.</summary>
        public IAsyncEnumerable<string> Tokens { get; set; }
    }
}
