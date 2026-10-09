using Portfolio.Chat.Contracts;
using Portfolio.Chat.Infrastructure;

namespace Portfolio.Chat.UnitTests;

public class ChatToolRegistryTests
{
    private static ChatToolRegistry For(params Type[] types) => new(types);

    [Fact]
    public void Discovers_only_actions_marked_as_tools()
    {
        var registry = For(typeof(ValidController));

        Assert.Equal(
            ["find_item", "get_broken", "get_empty", "get_greeting", "get_missing", "get_typed"],
            registry.Tools.Select(d => d.Name).Order().ToArray());
    }

    [Fact]
    public void Knows_which_tools_need_an_argument_and_ignores_the_cancellation_token()
    {
        var tools = For(typeof(ValidController)).Tools.ToDictionary(t => t.Name, t => t.NeedsArguments);

        Assert.True(tools["find_item"]);
        Assert.False(tools["get_greeting"]);
        Assert.False(tools["get_typed"]);
    }

    [Theory]
    [InlineData(typeof(PostToolController))]
    [InlineData(typeof(NoVerbToolController))]
    public void Rejects_tools_that_are_not_read_only_actions(Type controller)
    {
        var exception = Assert.Throws<InvalidOperationException>(() => For(controller));

        Assert.Contains("read-only", exception.Message);
    }

    [Fact]
    public void An_action_inherited_from_a_base_controller_is_a_tool_run_on_the_inheriting_controller()
    {
        var registry = For(typeof(DerivedToolController));

        Assert.True(registry.TryGet("get_inherited", out var tool));
        Assert.Equal(typeof(DerivedToolController), tool.ControllerType);
        Assert.Contains(registry.Tools, t => t.Name == "get_inherited");
    }

    [Fact]
    public void Rejects_duplicate_tool_names()
    {
        var exception = Assert.Throws<InvalidOperationException>(() => For(typeof(ValidController), typeof(DuplicateNameController)));

        Assert.Contains("get_greeting", exception.Message);
    }
}
