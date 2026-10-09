using Microsoft.AspNetCore.Mvc;

namespace RescuePC.Portfolio.Api.Results;

/// <summary>
/// Writes a stream of text to the client as Server-Sent Events while it is being produced. Headers set before the result
/// runs (like <c>Completion-Id</c>) are sent before the first token.
/// </summary>
public sealed class SseResult : IActionResult
{
    public const string InterruptedMessage = "The answer was interrupted.";

    private readonly IAsyncEnumerable<string> _stream;

    public SseResult(IAsyncEnumerable<string> stream)
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

        try
        {
            // Sends the headers now, so the client has them before the first token is written.
            await response.StartAsync(cancellationToken);

            await foreach (var token in _stream.WithCancellation(cancellationToken))
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
            httpContext.RequestServices.GetRequiredService<ILogger<SseResult>>()
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
