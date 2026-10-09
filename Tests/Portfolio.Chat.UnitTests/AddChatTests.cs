using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Application;
using Portfolio.Chat.Contracts;
using Portfolio.Chat.Infrastructure;

namespace Portfolio.Chat.UnitTests;

public class AddChatTests
{
    [Fact]
    public async Task The_module_lists_and_runs_tools_through_mediator()
    {
        // The whole path a chat request takes: module -> MediatR -> handler -> catalog -> controller.
        var services = new ServiceCollection().AddSingleton<GreetingService>();
        services.AddLogging();
        services.AddChat([typeof(ValidController)]);

        await using var provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        await using var scope = provider.CreateAsyncScope();
        var module = scope.ServiceProvider.GetRequiredService<IChatModule>();

        var tools = (await module.GetTools()).Select(t => t.Name).Order().ToArray();
        var result = await module.ExecuteTool("get_greeting", null!);

        Assert.Contains("get_greeting", tools);
        Assert.Equal("""{"text":"hello"}""", result);
    }

    [Fact]
    public async Task The_module_reports_a_failed_tool_call_as_ChatToolException()
    {
        var services = new ServiceCollection().AddSingleton<GreetingService>();
        services.AddLogging();
        services.AddChat([typeof(ValidController)]);

        await using var provider = services.BuildServiceProvider();
        await using var scope = provider.CreateAsyncScope();
        var module = scope.ServiceProvider.GetRequiredService<IChatModule>();

        await Assert.ThrowsAsync<ChatToolException>(() => module.ExecuteTool("get_unknown", "{}"));
    }

    [Fact]
    public void Registration_fails_fast_when_a_tool_is_invalid()
    {
        // The test assembly contains deliberately invalid controllers.
        var services = new ServiceCollection();

        Assert.Throws<InvalidOperationException>(() => services.AddChat(typeof(PostToolController).Assembly));
    }

    [Fact]
    public void Registration_requires_the_assemblies_to_scan()
    {
        Assert.Throws<ArgumentException>(() => new ServiceCollection().AddChat());
    }
}
