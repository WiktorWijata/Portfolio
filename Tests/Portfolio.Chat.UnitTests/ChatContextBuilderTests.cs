using Portfolio.Chat.Application;
using Portfolio.Chat.Application.Context;
using Portfolio.Chat.Contracts.Models;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.UnitTests;

public class ChatContextBuilderTests
{
    private sealed class FakeRegistry(params ChatToolDto[] tools) : IChatToolRegistry
    {
        public IReadOnlyList<ChatToolDto> Tools { get; } = tools;
    }

    private sealed class FakeRunner(Dictionary<string, string> results) : IChatToolRunner
    {
        public List<string> Calls { get; } = [];

        public Task<string> ExecuteAsync(string toolName, string? argumentsJson, CancellationToken cancellationToken = default)
        {
            Calls.Add(toolName);

            return results.TryGetValue(toolName, out var json)
                ? Task.FromResult(json)
                : throw new ChatToolException($"Tool '{toolName}' failed.");
        }
    }

    private static ChatToolDto Tool(string name, string description, params ChatToolParameterDto[] parameters)
        => new() { Name = name, Description = description, Parameters = parameters };

    private static ChatContextBuilder CreateBuilder(FakeRegistry registry, FakeRunner runner, string language = "PL")
        => new(registry, runner, new FixedCallerContext(language));

    [Fact]
    public async Task Puts_the_result_of_every_tool_without_required_arguments_in_the_data_part_in_name_order()
    {
        var runner = new FakeRunner(new() { ["get_b"] = """{"b":1}""", ["get_a"] = """["a"]""" });
        var builder = CreateBuilder(new FakeRegistry(Tool("get_b", "Second tool."), Tool("get_a", "First tool.")), runner);

        var context = await builder.BuildAsync();

        Assert.Equal(["get_a", "get_b"], runner.Calls);
        var behavior = ChatBehaviors.For("PL");
        Assert.Equal($"{behavior.DataIntro}\n\n## First tool.\n[\"a\"]\n\n## Second tool.\n{{\"b\":1}}", context.DomainContext);
    }

    [Fact]
    public async Task Skips_tools_that_need_an_argument_the_model_has_to_choose()
    {
        var runner = new FakeRunner(new() { ["get_all"] = "[]" });
        var needsArgument = Tool("find_item", "Finds an item.", new ChatToolParameterDto { Name = "name", Type = "string", Required = true });
        var optionalArgument = Tool("get_all", "Lists items.", new ChatToolParameterDto { Name = "limit", Type = "integer", Required = false });

        var context = await CreateBuilder(new FakeRegistry(needsArgument, optionalArgument), runner).BuildAsync();

        Assert.Equal(["get_all"], runner.Calls);
        Assert.DoesNotContain("Finds an item.", context.DomainContext);
    }

    [Fact]
    public async Task Uses_the_behavior_of_the_callers_language()
    {
        var runner = new FakeRunner(new());
        var registry = new FakeRegistry();

        var polish = await CreateBuilder(registry, runner, "PL").BuildAsync();
        var english = await CreateBuilder(registry, runner, "EN").BuildAsync();

        Assert.Equal("PL", polish.LanguageCode);
        Assert.Equal("EN", english.LanguageCode);
        Assert.Equal(ChatBehaviors.For("PL").SystemRole, polish.SystemRole);
        Assert.Equal(ChatBehaviors.For("EN").SystemRole, english.SystemRole);
        Assert.NotEqual(polish.SystemRole, english.SystemRole);
        Assert.NotEqual(polish.Name, english.Name);
    }

    [Fact]
    public async Task Renders_the_operating_rules_as_a_list()
    {
        var context = await CreateBuilder(new FakeRegistry(), new FakeRunner(new())).BuildAsync();

        var rules = ChatBehaviors.For("PL").OperatingRules;
        Assert.Equal(string.Join("\n", rules.Select(rule => $"- {rule}")), context.OperatingRules);
        Assert.All(context.OperatingRules.Split('\n'), line => Assert.StartsWith("- ", line));
    }

    [Fact]
    public async Task A_failing_tool_fails_the_build_instead_of_leaving_data_out_silently()
    {
        var builder = CreateBuilder(new FakeRegistry(Tool("get_broken", "Broken.")), new FakeRunner(new()));

        await Assert.ThrowsAsync<ChatToolException>(() => builder.BuildAsync());
    }

    [Theory]
    [MemberData(nameof(SupportedLanguages))]
    public void Every_supported_language_has_a_complete_behavior(string languageCode)
    {
        var behavior = ChatBehaviors.For(languageCode);

        Assert.All(
            new[] { behavior.Name, behavior.SystemRole, behavior.DataIntro, behavior.DecisionPolicy, behavior.OutputFormat },
            text => Assert.False(string.IsNullOrWhiteSpace(text)));
        Assert.NotEmpty(behavior.OperatingRules);
        Assert.NotEmpty(behavior.Examples);
        Assert.All(behavior.Examples, example =>
        {
            Assert.False(string.IsNullOrWhiteSpace(example.Input));
            Assert.False(string.IsNullOrWhiteSpace(example.ExpectedResponse));
        });
    }

    [Fact]
    public void An_unsupported_language_is_reported_clearly()
    {
        var exception = Assert.Throws<InvalidOperationException>(() => ChatBehaviors.For("XX"));

        Assert.Contains("XX", exception.Message);
    }

    public static TheoryData<string> SupportedLanguages() => new(CallerLanguages.Supported);
}
