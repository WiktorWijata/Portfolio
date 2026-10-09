using IntegratorAI.Api.Contracts.Chat;
using MediatR;
using Microsoft.Extensions.Options;
using Portfolio.Chat.Application.Commands;
using Portfolio.Chat.Contracts.Models;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.Application.CommandHandlers;

public class StartChatCompletionCommandHandler : IRequestHandler<StartChatCompletionCommand, ChatStreamDto>
{
    private const string CompletionIdHeader = "Completion-Id";

    private readonly IStreamChatApi _streamChatApi;
    private readonly IOptions<AssistantOptions> _options;
    private readonly ICallerContext _callerContext;

    public StartChatCompletionCommandHandler(IStreamChatApi streamChatApi, IOptions<AssistantOptions> options, ICallerContext callerContext)
    {
        _streamChatApi = streamChatApi;
        _options = options;
        _callerContext = callerContext;
    }

    // The assistant answers in the language of the caller, so the language picks the context.
    public async Task<ChatStreamDto> Handle(StartChatCompletionCommand request, CancellationToken cancellationToken)
    {
        var language = _callerContext.LanguageCode;
        if (!_options.Value.Contexts.TryGetValue(language, out var contextId) || contextId is null || contextId == Guid.Empty)
        {
            throw new InvalidOperationException($"No IntegratorAI context is configured for language {language}.");
        }

        var response = await _streamChatApi.CreateCompletion(new CompletionRequest { Prompt = request.Prompt }, contextId.Value, cancellationToken);
        response.EnsureSuccessStatusCode();

        if (!response.Headers.TryGetValues(CompletionIdHeader, out var values) || !Guid.TryParse(values.FirstOrDefault(), out var completionId))
        {
            response.Dispose();
            throw new InvalidOperationException("IntegratorAI did not return the id of the conversation.");
        }

        return new ChatStreamDto { CompletionId = completionId, Tokens = ServerSentEvents.ReadData(response, cancellationToken: cancellationToken) };
    }
}
