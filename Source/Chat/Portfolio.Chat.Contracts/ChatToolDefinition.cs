using System.Collections.Generic;

namespace Portfolio.Chat.Contracts
{
    /// <summary>A tool the chat assistant can call, as described to the model.</summary>
    public class ChatToolDefinition
    {
        public ChatToolDefinition(string name, string description, IReadOnlyList<ChatToolParameterDefinition> parameters)
        {
            Name = name;
            Description = description;
            Parameters = parameters;
        }

        public string Name { get; }
        public string Description { get; }
        public IReadOnlyList<ChatToolParameterDefinition> Parameters { get; }
    }

    public class ChatToolParameterDefinition
    {
        public ChatToolParameterDefinition(string name, string type, string description, bool required)
        {
            Name = name;
            Type = type;
            Description = description;
            Required = required;
        }

        public string Name { get; }

        /// <summary>JSON schema type: <c>string</c>, <c>integer</c>, <c>number</c> or <c>boolean</c>.</summary>
        public string Type { get; }

        public string Description { get; }
        public bool Required { get; }
    }
}
