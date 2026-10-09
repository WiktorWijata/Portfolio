using MediatR;
using Portfolio.Chat.Application.Commands;
using Portfolio.Chat.Contracts.Models;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.Application.CommandHandlers;

public class StartChatCompletionCommandHandler : IRequestHandler<StartChatCompletionCommand, ChatStreamDto>
{
    private readonly IChatCompletionGateway _gateway;
    private readonly ICallerContext _callerContext;

    public StartChatCompletionCommandHandler(IChatCompletionGateway gateway, ICallerContext callerContext)
    {
        _gateway = gateway;
        _callerContext = callerContext;
    }

    // The assistant answers in the language of the caller, so the language picks the context.
    public Task<ChatStreamDto> Handle(StartChatCompletionCommand request, CancellationToken cancellationToken)
        => _gateway.StartAsync(_callerContext.LanguageCode, request.Prompt, cancellationToken);
}
