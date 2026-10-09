using MediatR;
using Portfolio.Chat.Application.Commands;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application.CommandHandlers;

public class SynchronizeChatContextsCommandHandler : IRequestHandler<SynchronizeChatContextsCommand, IEnumerable<ChatContextSyncDto>>
{
    private readonly IChatContextSynchronizer _synchronizer;

    public SynchronizeChatContextsCommandHandler(IChatContextSynchronizer synchronizer)
    {
        _synchronizer = synchronizer;
    }

    public async Task<IEnumerable<ChatContextSyncDto>> Handle(SynchronizeChatContextsCommand request, CancellationToken cancellationToken)
        => await _synchronizer.SynchronizeAsync(cancellationToken);
}
