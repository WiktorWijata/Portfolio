using MediatR;
using Portfolio.Chat.Application.Queries;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application.QueryHandlers;

public class GetChatToolsQueryHandler : IRequestHandler<GetChatToolsQuery, IEnumerable<ChatToolDto>>
{
    private readonly IChatToolRegistry _registry;

    public GetChatToolsQueryHandler(IChatToolRegistry registry)
    {
        _registry = registry;
    }

    public Task<IEnumerable<ChatToolDto>> Handle(GetChatToolsQuery request, CancellationToken cancellationToken)
        => Task.FromResult<IEnumerable<ChatToolDto>>(_registry.Tools);
}
