using Microsoft.AspNetCore.Mvc;
using Portfolio.Chat.Contracts.Models;

namespace RescuePC.Portfolio.Api.Results;

/// <summary>
/// Writes the answer of the assistant to the client as Server-Sent Events while it is being produced. The id of the
/// conversation goes in the <c>Completion-Id</c> header, which is sent before the first token so the client has it at once.
/// </summary>
public sealed class ChatStreamResult : IActionResult
{
    public const string CompletionIdHeader = "Completion-Id";
    public const string InterruptedMessage = "The answer was interrupted.";

    private readonly ChatStreamDto _stream;

    public ChatStreamResult(ChatStreamDto stream)
    {
        _stream = stream;
    }

    public async Task ExecuteResultAsync(ActionContext context)
    {
        var httpContext = context.HttpContext;
        var response = httpContext.Response;
        var cancellationToken = httpContext.RequestAborted;

        response.ContentType = "text/event-stream";
        response.Headers.CacheControl = "no-cache";
        response.Headers["X-Accel-Buffering"] = "no";
        response.Headers[CompletionIdHeader] = _stream.CompletionId.ToString();

        try
        {
            // Sends the headers now, so the client has the conversation id before the first token is written.
            await response.StartAsync(cancellationToken);

            await foreach (var token in _stream.Tokens.WithCancellation(cancellationToken))
            {
                await response.WriteAsync(Frame(token), cancellationToken);
                await response.Body.FlushAsync(cancellationToken);
            }

            await response.WriteAsync("data: [DONE]\n\n", cancellationToken);
            await response.Body.FlushAsync(cancellationToken);
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            // The visitor left; there is nobody to tell.
        }
        catch (Exception exception)
        {
            // The status has been sent already, so the only way to report the failure is an event in the stream.
            httpContext.RequestServices.GetRequiredService<ILogger<ChatStreamResult>>()
                .LogError(exception, "The answer of the assistant was interrupted.");

            await response.WriteAsync($"event: error\ndata: {InterruptedMessage}\n\n", CancellationToken.None);
            await response.Body.FlushAsync(CancellationToken.None);
        }
    }

    /// <summary>
    /// One Server-Sent Event. A token with a line break is split into several <c>data:</c> lines, which a client joins
    /// back with "\n"; a bare line break would end the event and drop the rest of the token.
    /// </summary>
    public static string Frame(string data)
    {
        var lines = data.Replace("\r\n", "\n").Split('\n');

        return string.Concat(lines.Select(line => $"data: {line}\n")) + "\n";
    }
}
