using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Application;
using Portfolio.Chat.Contracts;
using Portfolio.Chat.Contracts.Models;
using Portfolio.Chat.Infrastructure;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.UnitTests;

public class ChatCompletionModuleTests
{
    private sealed class FakeGateway : IChatCompletionGateway
    {
        public (string Language, string Prompt)? Started { get; private set; }
        public (Guid Id, string Prompt)? Continued { get; private set; }

        public Task<ChatStreamDto> StartAsync(string languageCode, string prompt, CancellationToken cancellationToken = default)
        {
            Started = (languageCode, prompt);
            return Task.FromResult(new ChatStreamDto { CompletionId = Guid.Empty, Tokens = AsyncEnumerable.Empty<string>() });
        }

        public Task<ChatStreamDto> ContinueAsync(Guid completionId, string prompt, CancellationToken cancellationToken = default)
        {
            Continued = (completionId, prompt);
            return Task.FromResult(new ChatStreamDto { CompletionId = completionId, Tokens = AsyncEnumerable.Empty<string>() });
        }
    }

    private static (AsyncServiceScope Scope, FakeGateway Gateway) CreateModuleScope(string? language)
    {
        var gateway = new FakeGateway();
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddCallerContext();
        services.AddChat([typeof(ValidController)]);
        services.AddSingleton<IChatCompletionGateway>(gateway);

        var provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        var scope = provider.CreateAsyncScope();
        if (language is not null)
        {
            scope.ServiceProvider.GetRequiredService<CallerLanguageOverride>().LanguageCode = language;
        }

        return (scope, gateway);
    }

    [Theory]
    [InlineData("EN", "EN")]
    [InlineData("PL", "PL")]
    [InlineData(null, "PL")]
    public async Task Starting_hands_the_prompt_and_the_language_of_the_caller_to_the_gateway(string? language, string expectedLanguage)
    {
        var (scope, gateway) = CreateModuleScope(language);
        await using var _ = scope;

        await scope.ServiceProvider.GetRequiredService<IChatModule>().StartCompletion("hello");

        Assert.Equal((expectedLanguage, "hello"), gateway.Started);
    }

    [Fact]
    public async Task Continuing_hands_the_conversation_and_the_prompt_to_the_gateway()
    {
        var (scope, gateway) = CreateModuleScope("EN");
        await using var _ = scope;
        var completionId = Guid.NewGuid();

        var stream = await scope.ServiceProvider.GetRequiredService<IChatModule>().ContinueCompletion(completionId, "and then?");

        Assert.Equal(completionId, stream.CompletionId);
        Assert.Equal((completionId, "and then?"), gateway.Continued);
    }

    [Fact]
    public async Task A_failure_of_the_gateway_reaches_the_caller_unchanged()
    {
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddCallerContext();
        services.AddChat([typeof(ValidController)]);
        services.AddSingleton<IChatCompletionGateway>(new ThrowingGateway());
        await using var provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        await using var scope = provider.CreateAsyncScope();

        await Assert.ThrowsAsync<ChatUnavailableException>(() => scope.ServiceProvider.GetRequiredService<IChatModule>().StartCompletion("hello"));
    }

    private sealed class ThrowingGateway : IChatCompletionGateway
    {
        public Task<ChatStreamDto> StartAsync(string languageCode, string prompt, CancellationToken cancellationToken = default)
            => throw new ChatUnavailableException("not configured");

        public Task<ChatStreamDto> ContinueAsync(Guid completionId, string prompt, CancellationToken cancellationToken = default)
            => throw new ChatCompletionNotFoundException(completionId);
    }
}
