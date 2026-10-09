using MediatR;
using Portfolio.Chat.Application.Commands;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application.CommandHandlers;

public class ContinueChatCompletionCommandHandler : IRequestHandler<ContinueChatCompletionCommand, ChatStreamDto>
{
    private readonly IChatCompletionGateway _gateway;

    public ContinueChatCompletionCommandHandler(IChatCompletionGateway gateway)
    {
        _gateway = gateway;
    }

    public Task<ChatStreamDto> Handle(ContinueChatCompletionCommand request, CancellationToken cancellationToken)
        => _gateway.ContinueAsync(request.CompletionId, request.Prompt, cancellationToken);
}
