using MediatR;
using Portfolio.Chat.Application.Queries;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application.QueryHandlers;

public class GetChatToolsQueryHandler : IRequestHandler<GetChatToolsQuery, IEnumerable<ChatToolDto>>
{
    private readonly IChatToolCatalog _catalog;

    public GetChatToolsQueryHandler(IChatToolCatalog catalog)
    {
        _catalog = catalog;
    }

    public Task<IEnumerable<ChatToolDto>> Handle(GetChatToolsQuery request, CancellationToken cancellationToken)
        => Task.FromResult<IEnumerable<ChatToolDto>>(_catalog.GetTools());
}
