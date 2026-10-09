using System;

namespace Portfolio.Chat.Contracts
{
    /// <summary>
    /// Exposes a controller action to the chat assistant as a tool it can call to fetch data on demand.
    /// Only read-only actions (<c>[HttpGet]</c>) can be tools; this is verified when the application starts.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = false)]
    public sealed class ChatToolAttribute : Attribute
    {
        public ChatToolAttribute(string name, string description)
        {
            Name = name;
            Description = description;
        }

        /// <summary>Function name the model calls: lowercase letters, digits and underscores, e.g. <c>get_projects</c>.</summary>
        public string Name { get; }

        /// <summary>Tells the model what the tool returns and when to use it.</summary>
        public string Description { get; }
    }
}
