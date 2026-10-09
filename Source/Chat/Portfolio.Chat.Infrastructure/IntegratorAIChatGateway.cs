using System.Net;
using System.Runtime.CompilerServices;
using IntegratorAI.Api.Contracts.Chat;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Portfolio.Chat.Application;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Infrastructure;

/// <summary>
/// Talks to the assistant through IntegratorAI: picks the context of the caller's language, forwards the message and
/// hands the answer back piece by piece as IntegratorAI streams it.
/// </summary>
public sealed class IntegratorAIChatGateway : IChatCompletionGateway
{
    private const string CompletionIdHeader = "Completion-Id";
    private const string EndOfStream = "[DONE]";

    private readonly IServiceProvider _services;
    private readonly IOptions<IntegratorAIOptions> _options;

    // The client is resolved only when it is needed: creating it throws when IntegratorAI is not configured, and the
    // gateway should then report that the chat is unavailable instead of failing while it is being built.
    public IntegratorAIChatGateway(IServiceProvider services, IOptions<IntegratorAIOptions> options)
    {
        _services = services;
        _options = options;
    }

    public async Task<ChatStreamDto> StartAsync(string languageCode, string prompt, CancellationToken cancellationToken = default)
    {
        var contextId = ResolveContext(languageCode);

        var response = await SendAsync(
            api => api.CreateCompletion(new CompletionRequest { Prompt = prompt }, contextId, cancellationToken),
            missingCompletionId: null,
            cancellationToken);

        if (!response.Headers.TryGetValues(CompletionIdHeader, out var values) || !Guid.TryParse(values.FirstOrDefault(), out var completionId))
        {
            response.Dispose();
            throw new ChatProviderException("IntegratorAI did not return the id of the conversation.");
        }

        return new ChatStreamDto { CompletionId = completionId, Tokens = ReadTokens(response, cancellationToken) };
    }

    public async Task<ChatStreamDto> ContinueAsync(Guid completionId, string prompt, CancellationToken cancellationToken = default)
    {
        var response = await SendAsync(
            api => api.ContinueCompletion(completionId, new CompletionRequest { Prompt = prompt }, cancellationToken),
            missingCompletionId: completionId,
            cancellationToken);

        return new ChatStreamDto { CompletionId = completionId, Tokens = ReadTokens(response, cancellationToken) };
    }

    private Guid ResolveContext(string languageCode)
    {
        if (_options.Value.Contexts.TryGetValue(languageCode, out var contextId) && contextId is { } id && id != Guid.Empty)
        {
            return id;
        }

        throw new ChatUnavailableException($"No IntegratorAI context is configured for language {languageCode}.");
    }

    private async Task<HttpResponseMessage> SendAsync(
        Func<IStreamChatApi, Task<HttpResponseMessage>> call,
        Guid? missingCompletionId,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(_options.Value.BaseUrl))
        {
            throw new ChatUnavailableException($"{IntegratorAIOptions.SectionName}:BaseUrl is not configured.");
        }

        HttpResponseMessage response;
        try
        {
            response = await call(_services.GetRequiredService<IStreamChatApi>());
        }
        catch (Exception exception) when (exception is HttpRequestException or Refit.ApiRequestException or Refit.ApiException)
        {
            // Refit 15 wraps a transport failure (refused connection, DNS, TLS) in an ApiRequestException.
            throw new ChatProviderException("IntegratorAI could not be reached.", exception);
        }
        catch (TaskCanceledException exception) when (!cancellationToken.IsCancellationRequested)
        {
            throw new ChatProviderException("IntegratorAI did not answer in time.", exception);
        }

        if (response.IsSuccessStatusCode)
        {
            return response;
        }

        // The failure, with the body IntegratorAI sent, is already logged by the handler of the client.
        using (response)
        {
            if (response.StatusCode == HttpStatusCode.NotFound && missingCompletionId is { } completionId)
            {
                throw new ChatCompletionNotFoundException(completionId);
            }

            throw new ChatProviderException($"IntegratorAI answered {(int)response.StatusCode}.");
        }
    }

    /// <summary>Reads the Server-Sent Events of IntegratorAI and yields the text of each, until the end marker.</summary>
    private static async IAsyncEnumerable<string> ReadTokens(HttpResponseMessage response, [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        using (response)
        {
            await using var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
            using var reader = new StreamReader(stream);

            // An event can span several "data:" lines (a token with line breaks); they are joined back with "\n".
            var lines = new List<string>();

            while (await reader.ReadLineAsync(cancellationToken) is { } line)
            {
                if (line.Length == 0)
                {
                    if (lines.Count == 0)
                    {
                        continue;
                    }

                    var data = string.Join('\n', lines);
                    lines.Clear();

                    if (data == EndOfStream)
                    {
                        yield break;
                    }

                    if (data.Length > 0)
                    {
                        yield return data;
                    }
                }
                else if (line.StartsWith("data:", StringComparison.Ordinal))
                {
                    var value = line["data:".Length..];
                    lines.Add(value.StartsWith(' ') ? value[1..] : value);
                }
            }
        }
    }
}
