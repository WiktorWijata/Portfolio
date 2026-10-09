using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Application;
using Portfolio.Chat.Contracts;
using Portfolio.Chat.Infrastructure;

namespace Portfolio.Chat.UnitTests;

public class AddChatTests
{
    [Fact]
    public async Task The_runner_runs_a_tool_through_its_controller()
    {
        // The registration wires the runner to the registry and to the controller behind the tool.
        var services = new ServiceCollection().AddSingleton<GreetingService>();
        services.AddLogging();
        services.AddChat([typeof(ValidController)]);

        await using var provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        await using var scope = provider.CreateAsyncScope();
        var runner = scope.ServiceProvider.GetRequiredService<IChatToolRunner>();

        var result = await runner.ExecuteAsync("get_greeting", null);

        Assert.Equal("""{"text":"hello"}""", result);
    }

    [Fact]
    public async Task The_runner_reports_an_unknown_tool_as_ChatToolException()
    {
        var services = new ServiceCollection().AddSingleton<GreetingService>();
        services.AddLogging();
        services.AddChat([typeof(ValidController)]);

        await using var provider = services.BuildServiceProvider();
        await using var scope = provider.CreateAsyncScope();
        var runner = scope.ServiceProvider.GetRequiredService<IChatToolRunner>();

        await Assert.ThrowsAsync<ChatToolException>(() => runner.ExecuteAsync("get_unknown", "{}"));
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
