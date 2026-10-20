using MediatR;
using Portfolio.Chat.Application.Commands;
using Portfolio.Chat.Contracts;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Infrastructure;

public class ChatModule : IChatModule
{
    private readonly IMediator _mediator;

    public ChatModule(IMediator mediator)
    {
        _mediator = mediator;
    }

    public Task<IEnumerable<ChatContextSyncDto>> SynchronizeContexts(CancellationToken cancellationToken = default)
        => _mediator.Send(new SynchronizeChatContextsCommand(), cancellationToken);

    public Task<ChatStreamDto> StartCompletion(string prompt, CancellationToken cancellationToken = default)
        => _mediator.Send(new StartChatCompletionCommand(prompt), cancellationToken);

    public Task<ChatStreamDto> ContinueCompletion(Guid completionId, string prompt, CancellationToken cancellationToken = default)
        => _mediator.Send(new ContinueChatCompletionCommand(completionId, prompt), cancellationToken);
}
