namespace RescuePC.Portfolio.BuildingBlocks.Application;

/// <summary>
/// Exposes a controller action to the chat assistant as a tool it can call to fetch data on demand. The description
/// the model sees is in the instructions files of the chat module (one per language), under the name of the tool.
/// Only read-only actions (<c>[HttpGet]</c>) can be tools; this is verified when the application starts.
/// </summary>
[AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = false)]
public sealed class ChatToolAttribute : Attribute
{
    public ChatToolAttribute(string name)
    {
        Name = name;
    }

    /// <summary>Function name the model calls, e.g. <c>get_projects</c>.</summary>
    public string Name { get; }
}
