using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.UnitTests;

public sealed class GreetingService
{
    public string Greeting => "hello";
}

public sealed class ValidController(GreetingService greetings) : ControllerBase
{
    [ChatTool("get_greeting")]
    [HttpGet("greeting")]
    public Task<IActionResult> GetGreeting(CancellationToken cancellationToken = default)
        => Task.FromResult<IActionResult>(Ok(new { Text = greetings.Greeting, Missing = (string?)null }));

    [ChatTool("find_item")]
    [HttpGet("items")]
    public Task<IActionResult> FindItem(
        [Description("Name of the item.")] string name,
        [Description("Maximum number of results.")] int limit = 5,
        CancellationToken cancellationToken = default)
        => Task.FromResult<IActionResult>(Ok(new { name, limit }));

    [ChatTool("get_typed")]
    [HttpGet("typed")]
    public Task<ActionResult<string[]>> GetTyped() => Task.FromResult<ActionResult<string[]>>(new[] { "a", "b" });

    [ChatTool("get_missing")]
    [HttpGet("missing")]
    public Task<IActionResult> GetMissing() => Task.FromResult<IActionResult>(NotFound());

    [ChatTool("get_empty")]
    [HttpGet("empty")]
    public Task<IActionResult> GetEmpty() => Task.FromResult<IActionResult>(NoContent());

    [ChatTool("get_broken")]
    [HttpGet("broken")]
    public Task<IActionResult> GetBroken() => throw new InvalidOperationException("secret internal detail");

    // Not marked as a tool: must not be exposed.
    [HttpGet("hidden")]
    public Task<IActionResult> Hidden() => Task.FromResult<IActionResult>(Ok());
}

public sealed class PostToolController : ControllerBase
{
    [ChatTool("do_write")]
    [HttpPost("write")]
    public Task<IActionResult> Write() => Task.FromResult<IActionResult>(Ok());
}

public sealed class NoVerbToolController : ControllerBase
{
    [ChatTool("no_verb")]
    public Task<IActionResult> NoVerb() => Task.FromResult<IActionResult>(Ok());
}

public sealed class DuplicateNameController : ControllerBase
{
    [ChatTool("get_greeting")]
    [HttpGet("dup")]
    public Task<IActionResult> Duplicate() => Task.FromResult<IActionResult>(Ok());
}

public abstract class ToolBaseController : ControllerBase
{
    [ChatTool("get_inherited")]
    [HttpGet("inherited")]
    public Task<IActionResult> GetInherited() => Task.FromResult<IActionResult>(Ok(new { From = "base" }));
}

public sealed class DerivedToolController : ToolBaseController;

public sealed class ComplexParameterController : ControllerBase
{
    [ChatTool("complex_param")]
    [HttpGet("complex")]
    public Task<IActionResult> Complex(Guid id) => Task.FromResult<IActionResult>(Ok());
}
