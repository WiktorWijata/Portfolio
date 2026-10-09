using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Contracts;
using RescuePC.Portfolio.Api.Chat;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Api.UnitTests.Chat;

public class ControllerChatToolCatalogTests
{
    private static ControllerChatToolCatalog CreateCatalog()
    {
        var services = new ServiceCollection().AddSingleton<GreetingService>().BuildServiceProvider();
        return new ControllerChatToolCatalog(new ChatToolRegistry([typeof(ValidController)]), services);
    }

    [Fact]
    public async Task Runs_the_controller_with_its_dependencies_and_returns_json_without_nulls()
    {
        var json = await CreateCatalog().ExecuteAsync("get_greeting", null);

        Assert.Equal("""{"text":"hello"}""", json);
    }

    [Fact]
    public async Task Binds_arguments_ignoring_case_and_applies_defaults()
    {
        var json = await CreateCatalog().ExecuteAsync("find_item", """{"NAME":"lamp"}""");

        Assert.Equal("""{"name":"lamp","limit":5}""", json);
    }

    [Fact]
    public async Task Binds_typed_arguments()
    {
        var json = await CreateCatalog().ExecuteAsync("find_item", """{"name":"lamp","limit":2}""");

        Assert.Equal("""{"name":"lamp","limit":2}""", json);
    }

    [Fact]
    public async Task Unwraps_ActionResult_of_T()
    {
        var json = await CreateCatalog().ExecuteAsync("get_typed", "{}");

        Assert.Equal("""["a","b"]""", json);
    }

    [Fact]
    public async Task Treats_no_content_as_null()
    {
        Assert.Equal("null", await CreateCatalog().ExecuteAsync("get_empty", "null"));
    }

    [Theory]
    [InlineData("get_unknown", "{}", "Unknown tool")]
    [InlineData("find_item", "{}", "Missing required argument 'name'")]
    [InlineData("find_item", """{"name":null}""", "Missing required argument 'name'")]
    [InlineData("find_item", """{"name":"x","limit":"many"}""", "invalid value")]
    [InlineData("find_item", "{not json", "not valid JSON")]
    [InlineData("find_item", "[1,2]", "JSON object")]
    [InlineData("get_missing", "{}", "status 404")]
    public async Task Fails_with_a_message_the_model_can_act_on(string tool, string arguments, string expectedFragment)
    {
        var exception = await Assert.ThrowsAsync<ChatToolException>(() => CreateCatalog().ExecuteAsync(tool, arguments));

        Assert.Contains(expectedFragment, exception.Message);
    }

    [Fact]
    public async Task Does_not_leak_internal_error_details_to_the_model()
    {
        var exception = await Assert.ThrowsAsync<ChatToolException>(() => CreateCatalog().ExecuteAsync("get_broken", "{}"));

        Assert.DoesNotContain("secret internal detail", exception.Message);
        Assert.IsType<InvalidOperationException>(exception.InnerException);
    }
}

public class AddChatToolsTests
{
    [Fact]
    public void Registration_resolves_the_catalog_with_all_real_tools()
    {
        // Reproduces what happens at application startup: scanning, validation and DI wiring in one go.
        var services = new ServiceCollection();

        var exception = Record.Exception(() => services.AddChatTools());
        Assert.Null(exception);

        using var provider = services.BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true, ValidateOnBuild = false });
        using var scope = provider.CreateScope();
        var catalog = scope.ServiceProvider.GetRequiredService<IChatToolCatalog>();

        Assert.Equal(10, catalog.GetTools().Count);
        Assert.All(catalog.GetTools(), tool => Assert.False(string.IsNullOrWhiteSpace(tool.Description)));
    }

    [Fact]
    public void Registration_fails_fast_when_a_tool_is_invalid()
    {
        var services = new ServiceCollection();

        Assert.Throws<InvalidOperationException>(() =>
            services.AddChatTools(typeof(PostToolController).Assembly, typeof(ValidController).Assembly));
    }
}
