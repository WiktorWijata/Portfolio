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
    public void Describes_parameters_without_the_cancellation_token()
    {
        var tool = For(typeof(ValidController)).Tools.Single(d => d.Name == "find_item");

        Assert.Equal("Finds an item by name.", tool.Description);
        Assert.Collection(
            tool.Parameters,
            name =>
            {
                Assert.Equal("name", name.Name);
                Assert.Equal("string", name.Type);
                Assert.Equal("Name of the item.", name.Description);
                Assert.True(name.Required);
            },
            limit =>
            {
                Assert.Equal("limit", limit.Name);
                Assert.Equal("integer", limit.Type);
                Assert.False(limit.Required);
            });
    }

    [Theory]
    [InlineData(typeof(PostToolController), "read-only")]
    [InlineData(typeof(NoVerbToolController), "read-only")]
    [InlineData(typeof(BadNameController), "lowercase")]
    [InlineData(typeof(EmptyDescriptionController), "description")]
    [InlineData(typeof(SyncReturnController), "Task<IActionResult>")]
    [InlineData(typeof(ComplexParameterController), "unsupported type")]
    public void Rejects_invalid_tools_with_a_message_that_says_why(Type controller, string expectedFragment)
    {
        var exception = Assert.Throws<InvalidOperationException>(() => For(controller));

        Assert.Contains(expectedFragment, exception.Message);
    }

    [Fact]
    public void Rejects_duplicate_tool_names()
    {
        var exception = Assert.Throws<InvalidOperationException>(() => For(typeof(ValidController), typeof(DuplicateNameController)));

        Assert.Contains("get_greeting", exception.Message);
    }
}
