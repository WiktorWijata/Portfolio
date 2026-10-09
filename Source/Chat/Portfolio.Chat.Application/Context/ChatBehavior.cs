namespace Portfolio.Chat.Application.Context;

/// <summary>How the assistant behaves in one language. Loaded from the embedded <c>behavior.*.json</c> files.</summary>
public sealed class ChatBehavior
{
    public required string Name { get; init; }
    public required string SystemRole { get; init; }

    /// <summary>Opens the data part of the context, in front of the tool results.</summary>
    public required string DataIntro { get; init; }

    public required string DecisionPolicy { get; init; }
    public required string[] OperatingRules { get; init; }
    public required string OutputFormat { get; init; }
    public required ChatExample[] Examples { get; init; }
}

public sealed class ChatExample
{
    public required string Input { get; init; }
    public required string ExpectedResponse { get; init; }
}
