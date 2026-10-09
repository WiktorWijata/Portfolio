namespace Portfolio.Chat.Contracts.Models
{
    /// <summary>A tool the chat assistant can call to fetch data, as it is described to the model.</summary>
    public class ChatToolDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public ChatToolParameterDto[] Parameters { get; set; }
    }
}
