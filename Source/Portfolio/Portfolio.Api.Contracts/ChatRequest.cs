namespace RescuePC.Portfolio.Api.Contracts
{
    /// <summary>A message of the visitor to the chat assistant.</summary>
    public class ChatRequest
    {
        /// <summary>The message. Must not be empty and is limited in length.</summary>
        public string Prompt { get; set; }
    }
}
