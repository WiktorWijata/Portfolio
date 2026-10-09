namespace Portfolio.Chat.Contracts.Models
{
    public class ChatToolParameterDto
    {
        public string Name { get; set; }

        /// <summary>JSON schema type: <c>string</c>, <c>integer</c>, <c>number</c> or <c>boolean</c>.</summary>
        public string Type { get; set; }

        public string Description { get; set; }
        public bool Required { get; set; }
    }
}
