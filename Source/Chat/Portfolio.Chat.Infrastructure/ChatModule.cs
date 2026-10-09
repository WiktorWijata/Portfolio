using MediatR;
using Portfolio.Chat.Application.Commands;
using Portfolio.Chat.Application.Queries;
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

    public Task<IEnumerable<ChatToolDto>> GetTools(CancellationToken cancellationToken = default)
        => _mediator.Send(new GetChatToolsQuery(), cancellationToken);

    public Task<string> ExecuteTool(string toolName, string argumentsJson, CancellationToken cancellationToken = default)
        => _mediator.Send(new ExecuteChatToolQuery(toolName, argumentsJson), cancellationToken);

    public Task<IEnumerable<ChatContextSyncDto>> SynchronizeContexts(CancellationToken cancellationToken = default)
        => _mediator.Send(new SynchronizeChatContextsCommand(), cancellationToken);
}
