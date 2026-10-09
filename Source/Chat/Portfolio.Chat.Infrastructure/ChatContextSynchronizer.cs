using IntegratorAI.Api.Contracts.Context;
using IntegratorAI.Api.Contracts.Context.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Portfolio.Chat.Application;
using Portfolio.Chat.Application.Context;
using Portfolio.Chat.Contracts.Models;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.Infrastructure;

/// <summary>
/// Builds the assistant's context for every supported language and sends it to IntegratorAI: an update when the
/// context id is configured, otherwise a new context (its id is logged and returned so it can be configured).
/// </summary>
public sealed class ChatContextSynchronizer : IChatContextSynchronizer
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IContextApi _contextApi;
    private readonly IOptions<IntegratorAIOptions> _options;
    private readonly ILogger<ChatContextSynchronizer> _logger;

    public ChatContextSynchronizer(
        IServiceScopeFactory scopeFactory,
        IContextApi contextApi,
        IOptions<IntegratorAIOptions> options,
        ILogger<ChatContextSynchronizer> logger)
    {
        _scopeFactory = scopeFactory;
        _contextApi = contextApi;
        _options = options;
        _logger = logger;
    }

    public async Task<IReadOnlyList<ChatContextSyncDto>> SynchronizeAsync(CancellationToken cancellationToken = default)
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

        var definition = await scope.ServiceProvider.GetRequiredService<IChatContextBuilder>().BuildAsync(cancellationToken);
        var request = ToRequest(definition);

        if (_options.Value.Contexts.TryGetValue(languageCode, out var configuredId) && configuredId is { } contextId && contextId != Guid.Empty)
        {
            await _contextApi.UpdateContext(contextId, request, cancellationToken);
            _logger.LogInformation("Updated the chat context {ContextId} for language {LanguageCode}.", contextId, languageCode);

            return new ChatContextSyncDto { LanguageCode = languageCode, ContextId = contextId, Created = false };
        }

        var createdId = await _contextApi.CreateContext(request, cancellationToken);
        _logger.LogWarning(
            "Created the chat context {ContextId} for language {LanguageCode}. Set IntegratorAI:Contexts:{LanguageCode} to this id, or the next synchronization creates another one.",
            createdId, languageCode, languageCode);

        return new ChatContextSyncDto { LanguageCode = languageCode, ContextId = createdId, Created = true };
    }

    private static ContextRequest ToRequest(ChatContextDefinition definition) => new()
    {
        Name = definition.Name,
        SystemRole = definition.SystemRole,
        DomainContext = definition.DomainContext,
        DecisionPolicy = definition.DecisionPolicy,
        OperatingRules = definition.OperatingRules,
        OutputFormat = definition.OutputFormat,
        Examples = definition.Examples.Select(e => new Example { Input = e.Input, expectedResponse = e.ExpectedResponse }).ToArray(),
    };
}
