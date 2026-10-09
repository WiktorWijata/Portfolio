namespace Portfolio.Chat.Application.Context;

/// <summary>What IntegratorAI needs to know to behave as the portfolio assistant in one language.</summary>
public sealed class ChatContextDefinition
{
    public required string LanguageCode { get; init; }
    public required string Name { get; init; }
    public required string SystemRole { get; init; }

    /// <summary>The data about the portfolio's author, taken from the chat tools.</summary>
    public required string DomainContext { get; init; }

    public required string DecisionPolicy { get; init; }
    public required string OperatingRules { get; init; }
    public required string OutputFormat { get; init; }
    public required ChatExample[] Examples { get; init; }
}
