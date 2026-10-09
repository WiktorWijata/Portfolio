using Microsoft.AspNetCore.Mvc;
using Portfolio.Chat.Application;
using Portfolio.Chat.Contracts;
using Portfolio.Chat.Contracts.Models;
using RescuePC.Portfolio.Api.Contracts;
using RescuePC.Portfolio.Api.Results;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace RescuePC.Portfolio.Api.Controllers;

/// <summary>
/// The chat with the assistant. The answer is streamed as Server-Sent Events: each <c>data:</c> event is a piece of the
/// text, <c>[DONE]</c> ends it, and an <c>error</c> event reports an answer that broke off. The conversation id is in
/// the <c>Completion-Id</c> response header; send it back to continue. The assistant answers in the language of the
/// <c>Accept-Language</c> header.
/// </summary>
[ApiController]
[Route("chat")]
public class ChatController : ControllerBase
{
    public const int MaxPromptLength = 2000;

    private readonly IChatModule _chatModule;
    private readonly ILogger<ChatController> _logger;

    public ChatController(IChatModule chatModule, ILogger<ChatController> logger)
    {
        _chatModule = chatModule;
        _logger = logger;
    }

    /// <summary>Starts a conversation with a first message.</summary>
    [HttpPost("completions")]
    [Produces("text/event-stream", "application/problem+json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    [ProducesResponseType(StatusCodes.Status502BadGateway)]
    [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
    [RateLimit(permitLimit: 10, windowSeconds: 60)]
    public Task<IActionResult> Create([FromBody] ChatRequest request, CancellationToken cancellationToken = default)
        => RespondAsync(request, prompt => _chatModule.StartCompletion(prompt, cancellationToken));

    /// <summary>Adds a message to a conversation that was started before.</summary>
    [HttpPost("completions/{id:guid}")]
    [Produces("text/event-stream", "application/problem+json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    [ProducesResponseType(StatusCodes.Status502BadGateway)]
    [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
    [RateLimit(permitLimit: 10, windowSeconds: 60)]
    public Task<IActionResult> Continue(Guid id, [FromBody] ChatRequest request, CancellationToken cancellationToken = default)
        => RespondAsync(request, prompt => _chatModule.ContinueCompletion(id, prompt, cancellationToken));

    private async Task<IActionResult> RespondAsync(ChatRequest request, Func<string, Task<ChatStreamDto>> start)
    {
        var prompt = request.Prompt?.Trim();

        if (string.IsNullOrEmpty(prompt))
        {
            ModelState.AddModelError(nameof(ChatRequest.Prompt), "The message must not be empty.");
            return ValidationProblem(ModelState);
        }

        if (prompt.Length > MaxPromptLength)
        {
            ModelState.AddModelError(nameof(ChatRequest.Prompt), $"The message must not be longer than {MaxPromptLength} characters.");
            return ValidationProblem(ModelState);
        }

        try
        {
            return new ChatStreamResult(await start(prompt));
        }
        catch (ChatUnavailableException exception)
        {
            _logger.LogWarning(exception, "The chat is not available.");
            return Problem(statusCode: StatusCodes.Status503ServiceUnavailable, title: "Chat unavailable", detail: "The chat is not available right now.");
        }
        catch (ChatCompletionNotFoundException)
        {
            return Problem(statusCode: StatusCodes.Status404NotFound, title: "Conversation not found", detail: "This conversation does not exist. Start a new one.");
        }
        catch (ChatProviderException exception)
        {
            _logger.LogError(exception, "The assistant could not answer.");
            return Problem(statusCode: StatusCodes.Status502BadGateway, title: "Assistant unavailable", detail: "The assistant could not answer. Try again later.");
        }
    }
}
