using IntegratorAI.Api.Contracts.Chat;
using MediatR;
using Portfolio.Chat.Application.Commands;
using Portfolio.Chat.Contracts.Models;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.Application.CommandHandlers;

public class ContinueChatCompletionCommandHandler : IRequestHandler<ContinueChatCompletionCommand, ChatStreamDto>
{
    private readonly IStreamChatApi _streamChatApi;

    public ContinueChatCompletionCommandHandler(IStreamChatApi streamChatApi)
    {
        _streamChatApi = streamChatApi;
    }

    public async Task<ChatStreamDto> Handle(ContinueChatCompletionCommand request, CancellationToken cancellationToken)
    {
        var response = await _streamChatApi.ContinueCompletion(request.CompletionId, new CompletionRequest { Prompt = request.Prompt }, cancellationToken);
        response.EnsureSuccessStatusCode();

        return new ChatStreamDto { CompletionId = request.CompletionId, Tokens = ServerSentEvents.ReadData(response, cancellationToken: cancellationToken) };
    }
}
