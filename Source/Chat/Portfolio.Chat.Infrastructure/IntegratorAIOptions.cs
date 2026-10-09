namespace Portfolio.Chat.Infrastructure;

/// <summary>Where IntegratorAI is and which of its contexts the chat uses. Bound from the "IntegratorAI" section.</summary>
public sealed class IntegratorAIOptions
{
    public const string SectionName = "IntegratorAI";

    /// <summary>Base address including the API path base, e.g. <c>https://host/integratorai/api</c>.</summary>
    public string? BaseUrl { get; set; }

    /// <summary>IntegratorAI context to use per language code (<c>PL</c>, <c>EN</c>). Empty until the context is created.</summary>
    public Dictionary<string, Guid?> Contexts { get; set; } = new(StringComparer.OrdinalIgnoreCase);
}
