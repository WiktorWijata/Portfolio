using IntegratorAI.Api.Contracts.Context;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Portfolio.Chat.Application.Commands;
using Portfolio.Chat.Application.Queries;
using Portfolio.Chat.Contracts.Models;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.Application.CommandHandlers;

/// <summary>
/// Builds the assistant's context for every supported language and sends it to Assistant: an update when the
/// context id is configured, otherwise a new context (its id is logged and returned so it can be configured).
/// </summary>
public class SynchronizeChatContextsCommandHandler : IRequestHandler<SynchronizeChatContextsCommand, IEnumerable<ChatContextSyncDto>>
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IContextApi _contextApi;
    private readonly IOptions<AssistantOptions> _options;
    private readonly ILogger<SynchronizeChatContextsCommandHandler> _logger;

    public SynchronizeChatContextsCommandHandler(
        IServiceScopeFactory scopeFactory,
        IContextApi contextApi,
        IOptions<AssistantOptions> options,
        ILogger<SynchronizeChatContextsCommandHandler> logger)
    {
        _scopeFactory = scopeFactory;
        _contextApi = contextApi;
        _options = options;
        _logger = logger;
    }

    public async Task<IEnumerable<ChatContextSyncDto>> Handle(SynchronizeChatContextsCommand request, CancellationToken cancellationToken)
    {
        var results = new List<ChatContextSyncDto>();
        var failures = new List<Exception>();

        // One language failing must not keep the others from being updated; the failures are raised together at the end.
        foreach (var languageCode in CallerLanguages.Supported)
        {
            try
            {
                results.Add(await SynchronizeAsync(languageCode, cancellationToken));
            }
            catch (Exception exception) when (exception is not OperationCanceledException)
            {
                _logger.LogError(exception, "Synchronizing the chat context for language {LanguageCode} failed.", languageCode);
                failures.Add(exception);
            }
        }

        if (failures.Count > 0)
        {
            throw new AggregateException("Synchronizing the chat context failed for at least one language.", failures);
        }

        return results;
    }

    private async Task<ChatContextSyncDto> SynchronizeAsync(string languageCode, CancellationToken cancellationToken)
    {
        // A scope of its own, so that everything the builder uses (the tools, the Profile module) answers in this language.
        await using var scope = _scopeFactory.CreateAsyncScope();
        scope.ServiceProvider.GetRequiredService<CallerLanguageOverride>().LanguageCode = languageCode;

        var request = await scope.ServiceProvider.GetRequiredService<IMediator>().Send(new BuildChatContextQuery(), cancellationToken);

        if (_options.Value.Contexts.TryGetValue(languageCode, out var configuredId) && configuredId is { } contextId && contextId != Guid.Empty)
        {
            await _contextApi.UpdateContext(contextId, request, cancellationToken);
            _logger.LogInformation("Updated the chat context {ContextId} for language {LanguageCode}.", contextId, languageCode);

            return new ChatContextSyncDto { LanguageCode = languageCode, ContextId = contextId, Created = false };
        }

        var createdId = await _contextApi.CreateContext(request, cancellationToken);
        _logger.LogWarning(
            "Created the chat context {ContextId} for language {LanguageCode}. Set Assistant:Contexts:{LanguageCode} to this id, or the next synchronization creates another one.",
            createdId, languageCode, languageCode);

        return new ChatContextSyncDto { LanguageCode = languageCode, ContextId = createdId, Created = true };
    }
}
