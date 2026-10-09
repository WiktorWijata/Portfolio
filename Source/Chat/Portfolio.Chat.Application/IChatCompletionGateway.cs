using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application;

/// <summary>The assistant behind the chat. Implemented by the infrastructure layer on top of IntegratorAI.</summary>
public interface IChatCompletionGateway
{
    /// <summary>Starts a conversation with the assistant that speaks the given language.</summary>
    /// <exception cref="ChatUnavailableException">There is no context for the language, or IntegratorAI is not configured.</exception>
    /// <exception cref="ChatProviderException">IntegratorAI could not answer.</exception>
    Task<ChatStreamDto> StartAsync(string languageCode, string prompt, CancellationToken cancellationToken = default);

    /// <summary>Adds a message to a conversation that was started earlier. The language is the one it was started with.</summary>
    /// <exception cref="ChatCompletionNotFoundException">There is no such conversation.</exception>
    /// <exception cref="ChatProviderException">IntegratorAI could not answer.</exception>
    Task<ChatStreamDto> ContinueAsync(Guid completionId, string prompt, CancellationToken cancellationToken = default);
}
