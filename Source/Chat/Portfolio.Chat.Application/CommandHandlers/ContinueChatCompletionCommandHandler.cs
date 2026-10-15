using IntegratorAI.Api.Contracts.Chat;
using MediatR;
using Portfolio.Chat.Application.Commands;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application.CommandHandlers;

public class ContinueChatCompletionCommandHandler : IRequestHandler<ContinueChatCompletionCommand, ChatStreamDto>
{
    private readonly IStreamChatApi _streamChatApi;
    private readonly ChatAnswerStreamer _answerStreamer;

    public ContinueChatCompletionCommandHandler(IStreamChatApi streamChatApi, ChatAnswerStreamer answerStreamer)
    {
        _streamChatApi = streamChatApi;
        _answerStreamer = answerStreamer;
    }

    public async Task<ChatStreamDto> Handle(ContinueChatCompletionCommand request, CancellationToken cancellationToken)
    {
        var response = await _streamChatApi.ContinueCompletion(request.CompletionId, new CompletionRequest { Prompt = request.Prompt }, cancellationToken);
        response.EnsureSuccessStatusCode();

        return new ChatStreamDto { CompletionId = request.CompletionId, Tokens = _answerStreamer.Stream(request.CompletionId, response, cancellationToken) };
    }
}
