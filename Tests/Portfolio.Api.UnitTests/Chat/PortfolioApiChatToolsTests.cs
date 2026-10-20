using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Application;
using Portfolio.Chat.Contracts;
using Portfolio.Chat.Infrastructure;
using RescuePC.Portfolio.Api.Controllers;
using RescuePC.Portfolio.BuildingBlocks.Application;

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

        Assert.Equal(ExpectedTools, registry.Tools.Select(d => d.Name).Order().ToArray());
    }

    [Fact]
    public async Task Registration_wires_the_module_and_registers_all_tools_of_the_api()
    {
        // Reproduces what happens at application startup: scanning, validation and DI wiring in one go.
        var services = new ServiceCollection();

        var exception = Record.Exception(() => services.AddChat(typeof(ProfileController).Assembly));
        Assert.Null(exception);

        services.AddLogging();
        services.AddCallerContext();

        await using var provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });
        await using var scope = provider.CreateAsyncScope();
        var tools = scope.ServiceProvider.GetRequiredService<IChatToolRegistry>().Tools;

        Assert.Equal(ExpectedTools, tools.Select(t => t.Name).Order().ToArray());
        Assert.NotNull(scope.ServiceProvider.GetRequiredService<IChatModule>());
    }

    [Theory]
    [InlineData("PL")]
    [InlineData("EN")]
    public void Every_tool_of_the_api_is_described_for_the_model_in_every_language(string languageCode)
    {
        var registry = ChatToolRegistry.FromAssemblies([typeof(ProfileController).Assembly]);
        var instructions = ChatInstructions.For(languageCode);

        Assert.All(registry.Tools, tool => Assert.False(string.IsNullOrWhiteSpace(instructions.DescribeTool(tool.Name, languageCode))));
        Assert.Equal(ExpectedTools, instructions.Tools.Keys.Order().ToArray());
    }
}
