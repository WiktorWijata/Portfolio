using IntegratorAI.Api.Contracts.Context;
using Portfolio.Chat.Application;
using Portfolio.Chat.Application.Queries;
using Portfolio.Chat.Application.QueryHandlers;
using Portfolio.Chat.Contracts.Models;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.UnitTests;

public class BuildChatContextQueryHandlerTests
{
    private sealed class FakeRegistry(params ChatTool[] tools) : IChatToolRegistry
    {
        public IReadOnlyList<ChatTool> Tools { get; } = tools;
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

    private static ChatTool Tool(string name, bool needsArguments = false) => new(name, needsArguments);

    private static BuildChatContextQueryHandler CreateBuilder(FakeRegistry registry, FakeRunner runner, string language = "PL")
        => new(registry, runner, new FixedCallerContext(language));

    [Fact]
    public async Task Puts_the_result_of_every_tool_without_required_arguments_in_the_data_part_in_name_order()
    {
        var runner = new FakeRunner(new() { ["get_skills"] = """{"b":1}""", ["get_projects"] = """["a"]""" });
        var builder = CreateBuilder(new FakeRegistry(Tool("get_skills"), Tool("get_projects")), runner);

        var context = await builder.Build();

        Assert.Equal(["get_projects", "get_skills"], runner.Calls);
        var instructions = ChatInstructions.For("PL");
        Assert.Equal(
            $"{instructions.DataIntro}\n\n## {instructions.Tools["get_projects"]}\n[\"a\"]\n\n## {instructions.Tools["get_skills"]}\n{{\"b\":1}}",
            context.DomainContext);
    }

    [Fact]
    public async Task Skips_tools_that_need_an_argument_the_model_has_to_choose()
    {
        var runner = new FakeRunner(new() { ["get_skills"] = "[]" });

        var context = await CreateBuilder(new FakeRegistry(Tool("get_projects", needsArguments: true), Tool("get_skills")), runner).Build();

        Assert.Equal(["get_skills"], runner.Calls);
        Assert.DoesNotContain(ChatInstructions.For("PL").Tools["get_projects"], context.DomainContext);
    }

    [Fact]
    public async Task Uses_the_instructions_of_the_callers_language()
    {
        var runner = new FakeRunner(new());
        var registry = new FakeRegistry();

        var polish = await CreateBuilder(registry, runner, "PL").Build();
        var english = await CreateBuilder(registry, runner, "EN").Build();

        Assert.Equal(ChatInstructions.For("PL").SystemRole, polish.SystemRole);
        Assert.Equal(ChatInstructions.For("EN").SystemRole, english.SystemRole);
        Assert.NotEqual(polish.SystemRole, english.SystemRole);
        Assert.NotEqual(polish.Name, english.Name);
    }

    [Fact]
    public async Task Renders_the_operating_rules_as_a_list()
    {
        var context = await CreateBuilder(new FakeRegistry(), new FakeRunner(new())).Build();

        var rules = ChatInstructions.For("PL").OperatingRules;
        Assert.Equal(string.Join("\n", rules.Select(rule => $"- {rule}")), context.OperatingRules);
        Assert.All(context.OperatingRules.Split('\n'), line => Assert.StartsWith("- ", line));
    }

    [Fact]
    public async Task Declares_no_tools_but_never_null_because_IntegratorAI_cannot_create_a_context_without_the_list()
    {
        var context = await CreateBuilder(new FakeRegistry(), new FakeRunner(new())).Build();

        Assert.NotNull(context.Tools);
        Assert.Empty(context.Tools);
    }

    [Fact]
    public async Task A_failing_tool_fails_the_build_instead_of_leaving_data_out_silently()
    {
        var builder = CreateBuilder(new FakeRegistry(Tool("get_projects")), new FakeRunner(new()));

        await Assert.ThrowsAsync<ChatToolException>(() => builder.Build());
    }

    [Theory]
    [MemberData(nameof(SupportedLanguages))]
    public void Every_supported_language_has_complete_instructions(string languageCode)
    {
        var instructions = ChatInstructions.For(languageCode);

        Assert.All(
            new[] { instructions.Name, instructions.SystemRole, instructions.DataIntro, instructions.DecisionPolicy, instructions.OutputFormat },
            text => Assert.False(string.IsNullOrWhiteSpace(text)));
        Assert.NotEmpty(instructions.OperatingRules);
        Assert.NotEmpty(instructions.Examples);
        Assert.All(instructions.Examples, example =>
        {
            Assert.False(string.IsNullOrWhiteSpace(example.Input));
            Assert.False(string.IsNullOrWhiteSpace(example.expectedResponse));
        });
    }

    [Fact]
    public async Task A_tool_without_a_description_in_the_language_fails_the_build()
    {
        var builder = CreateBuilder(new FakeRegistry(Tool("get_greeting")), new FakeRunner(new() { ["get_greeting"] = "{}" }));

        var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => builder.Build());

        Assert.Contains("get_greeting", exception.Message);
    }

    [Fact]
    public void An_unsupported_language_is_reported_clearly()
    {
        var exception = Assert.Throws<InvalidOperationException>(() => ChatInstructions.For("XX"));

        Assert.Contains("XX", exception.Message);
    }

    public static TheoryData<string> SupportedLanguages() => new(CallerLanguages.Supported);
}

internal static class BuildChatContextQueryHandlerExtensions
{
    public static Task<ContextRequest> Build(this BuildChatContextQueryHandler handler)
        => handler.Handle(new BuildChatContextQuery(), CancellationToken.None);
}
