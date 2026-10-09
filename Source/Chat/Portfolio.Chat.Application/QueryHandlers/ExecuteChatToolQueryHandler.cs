using MediatR;
using Portfolio.Chat.Application.Queries;

namespace Portfolio.Chat.Application.QueryHandlers;

public class ExecuteChatToolQueryHandler : IRequestHandler<ExecuteChatToolQuery, string>
{
    private readonly IChatToolCatalog _catalog;

    public ExecuteChatToolQueryHandler(IChatToolCatalog catalog)
    {
        _catalog = catalog;
    }

    public Task<string> Handle(ExecuteChatToolQuery request, CancellationToken cancellationToken)
        => _catalog.ExecuteAsync(request.ToolName, request.ArgumentsJson, cancellationToken);
}
