using MediatR;
using Portfolio.Chat.Application.Queries;

namespace Portfolio.Chat.Application.QueryHandlers;

public class ExecuteChatToolQueryHandler : IRequestHandler<ExecuteChatToolQuery, string>
{
    private readonly IChatToolRunner _runner;

    public ExecuteChatToolQueryHandler(IChatToolRunner runner)
    {
        _runner = runner;
    }

    public Task<string> Handle(ExecuteChatToolQuery request, CancellationToken cancellationToken)
        => _runner.ExecuteAsync(request.ToolName, request.ArgumentsJson, cancellationToken);
}
