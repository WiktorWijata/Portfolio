using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Contracts;
using Portfolio.Chat.Infrastructure;
using RescuePC.Portfolio.Api.Controllers;

namespace Portfolio.Api.UnitTests.Chat;

public class PortfolioApiChatToolsTests
{
    private static readonly string[] ExpectedTools =
    [
        "get_aspirations", "get_business", "get_certificates", "get_contacts", "get_experiences",
        "get_introduction", "get_projects", "get_services", "get_skills", "get_specializations",
    ];

    [Fact]
    public void Controllers_of_the_api_are_all_valid_tools()
    {
        var registry = ChatToolRegistry.FromAssemblies([typeof(ProfileController).Assembly]);

        Assert.Equal(ExpectedTools, registry.Definitions.Select(d => d.Name).Order().ToArray());
    }

    [Fact]
    public async Task Registration_resolves_the_module_with_all_tools_of_the_api()
    {
        // Reproduces what happens at application startup: scanning, validation and DI wiring in one go.
        var services = new ServiceCollection();

        var exception = Record.Exception(() => services.AddChat(typeof(ProfileController).Assembly));
        Assert.Null(exception);

        services.AddLogging();

        await using var provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        await using var scope = provider.CreateAsyncScope();
        var tools = (await scope.ServiceProvider.GetRequiredService<IChatModule>().GetTools()).ToArray();

        Assert.Equal(ExpectedTools, tools.Select(t => t.Name).Order().ToArray());
        Assert.All(tools, tool => Assert.False(string.IsNullOrWhiteSpace(tool.Description)));
    }
}
