using IntegratorAI.Api.Contracts.Context;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Application;
using Portfolio.Chat.Application.Context;
using Portfolio.Chat.Contracts;
using Portfolio.Chat.Infrastructure;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.UnitTests;

public class ChatContextSynchronizerTests
{
    private sealed class FakeContextApi : IContextApi
    {
        public List<(Guid Id, ContextRequest Request)> Updates { get; } = [];
        public List<ContextRequest> Creates { get; } = [];
        public Dictionary<string, Guid> CreatedIds { get; } = [];

        public Task<Guid> CreateContext(ContextRequest request, CancellationToken cancellationToken = default)
        {
            Creates.Add(request);
            var id = Guid.NewGuid();
            CreatedIds[request.Name] = id;
            return Task.FromResult(id);
        }

        public Task UpdateContext(Guid id, ContextRequest request, CancellationToken cancellationToken = default)
        {
            Updates.Add((id, request));
            return Task.CompletedTask;
        }
    }

    private sealed class FakeBuilder(ICallerContext caller, string? failForLanguage) : IChatContextBuilder
    {
        public Task<ChatContextDefinition> BuildAsync(CancellationToken cancellationToken = default)
        {
            if (caller.LanguageCode == failForLanguage)
            {
                throw new InvalidOperationException($"The data for {failForLanguage} cannot be read.");
            }

            return Task.FromResult(new ChatContextDefinition
            {
                LanguageCode = caller.LanguageCode,
                Name = $"ctx-{caller.LanguageCode}",
                SystemRole = $"role-{caller.LanguageCode}",
                DomainContext = $"data-{caller.LanguageCode}",
                DecisionPolicy = "policy",
                OperatingRules = "- rule",
                OutputFormat = "format",
                Examples = [new ChatExample { Input = "in", ExpectedResponse = "out" }],
            });
        }
    }

    private static ServiceProvider CreateProvider(
        FakeContextApi api,
        Guid? polishId = null,
        Guid? englishId = null,
        string? failForLanguage = null)
    {
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddCallerContext();
        services.Configure<IntegratorAIOptions>(options =>
        {
            options.Contexts["PL"] = polishId;
            options.Contexts["EN"] = englishId;
        });
        services.AddSingleton<IContextApi>(api);
        services.AddScoped<IChatContextBuilder>(provider => new FakeBuilder(provider.GetRequiredService<ICallerContext>(), failForLanguage));
        services.AddScoped<IChatContextSynchronizer, ChatContextSynchronizer>();

        return services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
    }

    private static Task<IReadOnlyList<Portfolio.Chat.Contracts.Models.ChatContextSyncDto>> Synchronize(ServiceProvider provider)
    {
        var scope = provider.CreateScope();
        return scope.ServiceProvider.GetRequiredService<IChatContextSynchronizer>().SynchronizeAsync();
    }

    [Fact]
    public async Task Updates_the_configured_context_of_every_language_with_that_languages_data()
    {
        var api = new FakeContextApi();
        var (polish, english) = (Guid.NewGuid(), Guid.NewGuid());
        using var provider = CreateProvider(api, polish, english);

        var results = await Synchronize(provider);

        Assert.Empty(api.Creates);
        Assert.Equal(2, api.Updates.Count);
        Assert.Equal("data-PL", api.Updates.Single(u => u.Id == polish).Request.DomainContext);
        Assert.Equal("data-EN", api.Updates.Single(u => u.Id == english).Request.DomainContext);
        Assert.All(results, result => Assert.False(result.Created));
        Assert.Equal([polish, english], results.OrderBy(r => r.LanguageCode == "PL" ? 0 : 1).Select(r => r.ContextId).ToArray());
    }

    [Fact]
    public async Task Creates_a_context_when_none_is_configured_and_reports_its_id()
    {
        var api = new FakeContextApi();
        using var provider = CreateProvider(api);

        var results = await Synchronize(provider);

        Assert.Empty(api.Updates);
        Assert.Equal(2, api.Creates.Count);
        Assert.All(results, result => Assert.True(result.Created));
        Assert.Equal(api.CreatedIds["ctx-PL"], results.Single(r => r.LanguageCode == "PL").ContextId);
        Assert.Equal(api.CreatedIds["ctx-EN"], results.Single(r => r.LanguageCode == "EN").ContextId);
    }

    [Fact]
    public async Task Updates_one_language_and_creates_the_other_when_only_one_is_configured()
    {
        var api = new FakeContextApi();
        var polish = Guid.NewGuid();
        using var provider = CreateProvider(api, polishId: polish);

        var results = await Synchronize(provider);

        Assert.Equal(polish, Assert.Single(api.Updates).Id);
        Assert.Equal("ctx-EN", Assert.Single(api.Creates).Name);
        Assert.False(results.Single(r => r.LanguageCode == "PL").Created);
        Assert.True(results.Single(r => r.LanguageCode == "EN").Created);
    }

    [Fact]
    public async Task An_empty_guid_counts_as_not_configured()
    {
        var api = new FakeContextApi();
        using var provider = CreateProvider(api, polishId: Guid.Empty, englishId: Guid.Empty);

        await Synchronize(provider);

        Assert.Empty(api.Updates);
        Assert.Equal(2, api.Creates.Count);
    }

    [Fact]
    public async Task Sends_every_part_of_the_definition()
    {
        var api = new FakeContextApi();
        using var provider = CreateProvider(api, englishId: Guid.NewGuid());

        await Synchronize(provider);

        var request = api.Updates.Single().Request;
        Assert.Equal("ctx-EN", request.Name);
        Assert.Equal("role-EN", request.SystemRole);
        Assert.Equal("data-EN", request.DomainContext);
        Assert.Equal("policy", request.DecisionPolicy);
        Assert.Equal("- rule", request.OperatingRules);
        Assert.Equal("format", request.OutputFormat);
        var example = Assert.Single(request.Examples);
        Assert.Equal("in", example.Input);
        Assert.Equal("out", example.expectedResponse);
        Assert.Null(request.Tools);
    }

    [Fact]
    public async Task A_failing_language_does_not_keep_the_other_one_from_being_updated()
    {
        var api = new FakeContextApi();
        var english = Guid.NewGuid();
        using var provider = CreateProvider(api, Guid.NewGuid(), english, failForLanguage: "PL");

        var exception = await Assert.ThrowsAsync<AggregateException>(() => Synchronize(provider));

        Assert.Single(exception.InnerExceptions);
        Assert.Contains("PL", exception.InnerExceptions[0].Message);
        Assert.Equal(english, Assert.Single(api.Updates).Id);
    }

    [Fact]
    public async Task The_module_runs_the_whole_synchronization_through_mediator()
    {
        var api = new FakeContextApi();
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddCallerContext();
        services.Configure<IntegratorAIOptions>(options => options.Contexts["PL"] = Guid.NewGuid());
        services.AddSingleton<IContextApi>(api);
        services.AddChat([typeof(ValidController)]);
        services.AddScoped<IChatContextBuilder>(provider => new FakeBuilder(provider.GetRequiredService<ICallerContext>(), failForLanguage: null));

        await using var provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        await using var scope = provider.CreateAsyncScope();

        var results = (await scope.ServiceProvider.GetRequiredService<IChatModule>().SynchronizeContexts()).ToArray();

        Assert.Equal(2, results.Length);
        Assert.Single(api.Updates);
        Assert.Single(api.Creates);
    }
}
