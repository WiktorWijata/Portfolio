using System;

namespace Portfolio.Chat.Contracts.Models
{
    /// <summary>The outcome of synchronizing the assistant's context for one language with IntegratorAI.</summary>
    public class ChatContextSyncDto
    {
        public string LanguageCode { get; set; }

        /// <summary>The IntegratorAI context that was updated or created.</summary>
        public Guid ContextId { get; set; }

        /// <summary>True when the context did not exist yet: put <see cref="ContextId"/> in the configuration.</summary>
        public bool Created { get; set; }
    }
}
