namespace Portfolio.Chat.Application;

/// <summary>The chat cannot be used right now: IntegratorAI or the context for the language is not configured.</summary>
public class ChatUnavailableException : Exception
{
    public ChatUnavailableException(string message) : base(message)
    {
    }
}

/// <summary>IntegratorAI could not answer (it is down, rejected the request, or its model provider failed).</summary>
public class ChatProviderException : Exception
{
    public ChatProviderException(string message, Exception? innerException = null) : base(message, innerException)
    {
    }
}

/// <summary>The conversation the client wants to continue does not exist in IntegratorAI.</summary>
public class ChatCompletionNotFoundException : Exception
{
    public ChatCompletionNotFoundException(Guid completionId) : base($"The conversation {completionId} does not exist.")
    {
        CompletionId = completionId;
    }

    public Guid CompletionId { get; }
}
