using System.ComponentModel.DataAnnotations;

namespace RescuePC.Portfolio.Api.Contracts
{
    /// <summary>A message of the visitor to the chat assistant.</summary>
    public class ChatRequest
    {
        public const int MaxPromptLength = 2000;

        /// <summary>The message. Must not be empty and is limited in length.</summary>
        [Required]
        [StringLength(MaxPromptLength)]
        public string Prompt { get; set; }
    }
}
