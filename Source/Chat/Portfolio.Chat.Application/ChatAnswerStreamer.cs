using System.Runtime.CompilerServices;
using System.Text.Json;
using IntegratorAI.Api.Contracts.Chat;
using Microsoft.Extensions.Logging;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.Application;

/// <summary>
/// Turns the stream of IntegratorAI into the answer for the visitor. When the model asks for tools instead of
/// answering, the tools are run here, their results go back to IntegratorAI, and the stream goes on with the answer
/// the model writes from them. The visitor sees one continuous stream of text.
/// </summary>
public class ChatAnswerStreamer
{
    /// <summary>How many times the model may ask for tools within one answer. The last round is answered with a refusal.</summary>
    public const int MaxToolRounds = 3;

    private const string ToolCallEvent = "tool_call";
    private const string TooManyToolCalls = "Too many tool calls. Answer with the information you already have.";

    private readonly IStreamChatApi _streamChatApi;
    private readonly IChatToolRunner _toolRunner;
    private readonly ILogger<ChatAnswerStreamer> _logger;

    public ChatAnswerStreamer(IStreamChatApi streamChatApi, IChatToolRunner toolRunner, ILogger<ChatAnswerStreamer> logger)
    {
        _streamChatApi = streamChatApi;
        _toolRunner = toolRunner;
        _logger = logger;
    }

    /// <summary>The tokens of the answer. <paramref name="response"/> is the stream of IntegratorAI; it is disposed when read.</summary>
    public async IAsyncEnumerable<string> Stream(
        Guid completionId,
        HttpResponseMessage response,
        [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        for (var round = 0; ; round++)
        {
            var toolCalls = new List<ToolCall>();

            await foreach (var item in ServerSentEvents.ReadEvents(response, cancellationToken: cancellationToken))
            {
                if (item.Name == ToolCallEvent)
                {
                    toolCalls.Add(ToolCall.Parse(item.Data));
                    continue;
                }

                yield return item.Data;
            }

            if (toolCalls.Count == 0)
            {
                yield break;
            }

            // IntegratorAI waits for an answer to every call, so the model is refused, not left hanging, when it asks too often.
            if (round > MaxToolRounds)
            {
                throw new InvalidOperationException("The assistant kept asking for tools.");
            }

            var results = round < MaxToolRounds
                ? await RunToolsAsync(toolCalls, cancellationToken)
                : toolCalls.Select(call => new ToolResultRequest { ToolCallId = call.Id, Content = TooManyToolCalls, IsError = true }).ToArray();

            response = await _streamChatApi.SubmitToolResults(completionId, new ToolResultsRequest { Results = results }, cancellationToken);
            response.EnsureSuccessStatusCode();
        }
    }

    private async Task<ToolResultRequest[]> RunToolsAsync(IReadOnlyList<ToolCall> toolCalls, CancellationToken cancellationToken)
    {
        var results = new List<ToolResultRequest>(toolCalls.Count);

        foreach (var call in toolCalls)
        {
            results.Add(await RunToolAsync(call, cancellationToken));
        }

        return results.ToArray();
    }

    private async Task<ToolResultRequest> RunToolAsync(ToolCall call, CancellationToken cancellationToken)
    {
        try
        {
            var content = await _toolRunner.ExecuteAsync(call.Name, call.ArgumentsJson, cancellationToken);

            return content.Length > ToolResultRequest.MaxContentLength
                ? Failure(call, "The result is too large to hand over.")
                : new ToolResultRequest { ToolCallId = call.Id, Content = content };
        }
        catch (ChatToolException exception)
        {
            // The message of this exception is meant for the model.
            _logger.LogWarning(exception, "The chat tool {Tool} could not be run", call.Name);
            return Failure(call, exception.Message);
        }
        catch (Exception exception) when (exception is not OperationCanceledException)
        {
            // Anything else may say more than the model should hear.
            _logger.LogError(exception, "The chat tool {Tool} failed", call.Name);
            return Failure(call, $"Tool '{call.Name}' failed.");
        }
    }

    private static ToolResultRequest Failure(ToolCall call, string message)
        => new() { ToolCallId = call.Id, Content = message, IsError = true };

    private sealed record ToolCall(string Id, string Name, string ArgumentsJson)
    {
        public static ToolCall Parse(string data)
        {
            using var document = JsonDocument.Parse(data);
            var root = document.RootElement;

            return new ToolCall(
                root.GetProperty("id").GetString()!,
                root.GetProperty("name").GetString()!,
                root.TryGetProperty("arguments", out var arguments) ? arguments.GetRawText() : "{}");
        }
    }
}
