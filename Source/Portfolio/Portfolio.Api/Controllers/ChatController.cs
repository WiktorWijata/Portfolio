using Microsoft.AspNetCore.Mvc;
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
    private const string CompletionIdHeader = "Completion-Id";

    private readonly IChatModule _chatModule;

    public ChatController(IChatModule chatModule)
    {
        _chatModule = chatModule;
    }

    /// <summary>Starts a conversation with a first message.</summary>
    [HttpPost("completions")]
    [Produces("text/event-stream", "application/problem+json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    [RateLimit(permitLimit: 10, windowSeconds: 60)]
    public async Task<IActionResult> Create([FromBody] ChatRequest request, CancellationToken cancellationToken)
    {
        return Stream(await _chatModule.StartCompletion(request.Prompt, cancellationToken));
    }

    /// <summary>Adds a message to a conversation that was started before.</summary>
    [HttpPost("completions/{id:guid}")]
    [Produces("text/event-stream", "application/problem+json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    [RateLimit(permitLimit: 10, windowSeconds: 60)]
    public async Task<IActionResult> Continue(Guid id, [FromBody] ChatRequest request, CancellationToken cancellationToken)
    {
        return Stream(await _chatModule.ContinueCompletion(id, request.Prompt, cancellationToken));
    }

    // The id of the conversation goes out in a header, which is sent before the first token.
    private IActionResult Stream(ChatStreamDto stream)
    {
        Response.Headers[CompletionIdHeader] = stream.CompletionId.ToString();
        return new SseResult(stream.Tokens);
    }
}
