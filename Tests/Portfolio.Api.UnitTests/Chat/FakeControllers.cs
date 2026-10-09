using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Chat.Contracts;

namespace Portfolio.Api.UnitTests.Chat;

public sealed class GreetingService
{
    public string Greeting => "hello";
}

public sealed class ValidController(GreetingService greetings) : ControllerBase
{
    [ChatTool("get_greeting", "Returns a greeting.")]
    [HttpGet("greeting")]
    public Task<IActionResult> GetGreeting(CancellationToken cancellationToken = default)
        => Task.FromResult<IActionResult>(Ok(new { Text = greetings.Greeting, Missing = (string?)null }));

    [ChatTool("find_item", "Finds an item by name.")]
    [HttpGet("items")]
    public Task<IActionResult> FindItem(
        [Description("Name of the item.")] string name,
        [Description("Maximum number of results.")] int limit = 5,
        CancellationToken cancellationToken = default)
        => Task.FromResult<IActionResult>(Ok(new { name, limit }));

    [ChatTool("get_typed", "Returns an ActionResult<T>.")]
    [HttpGet("typed")]
    public Task<ActionResult<string[]>> GetTyped() => Task.FromResult<ActionResult<string[]>>(new[] { "a", "b" });

    [ChatTool("get_missing", "Always not found.")]
    [HttpGet("missing")]
    public Task<IActionResult> GetMissing() => Task.FromResult<IActionResult>(NotFound());

    [ChatTool("get_empty", "Returns no content.")]
    [HttpGet("empty")]
    public Task<IActionResult> GetEmpty() => Task.FromResult<IActionResult>(NoContent());

    [ChatTool("get_broken", "Always throws.")]
    [HttpGet("broken")]
    public Task<IActionResult> GetBroken() => throw new InvalidOperationException("secret internal detail");

    // Not marked as a tool: must not be exposed.
    [HttpGet("hidden")]
    public Task<IActionResult> Hidden() => Task.FromResult<IActionResult>(Ok());
}

public sealed class PostToolController : ControllerBase
{
    [ChatTool("do_write", "Writes something.")]
    [HttpPost("write")]
    public Task<IActionResult> Write() => Task.FromResult<IActionResult>(Ok());
}

public sealed class NoVerbToolController : ControllerBase
{
    [ChatTool("no_verb", "Has no HTTP verb.")]
    public Task<IActionResult> NoVerb() => Task.FromResult<IActionResult>(Ok());
}

public sealed class BadNameController : ControllerBase
{
    [ChatTool("GetProjects", "Upper case name.")]
    [HttpGet("a")]
    public Task<IActionResult> A() => Task.FromResult<IActionResult>(Ok());
}

public sealed class EmptyDescriptionController : ControllerBase
{
    [ChatTool("empty_description", " ")]
    [HttpGet("a")]
    public Task<IActionResult> A() => Task.FromResult<IActionResult>(Ok());
}

public sealed class DuplicateNameController : ControllerBase
{
    [ChatTool("get_greeting", "Same name as in ValidController.")]
    [HttpGet("dup")]
    public Task<IActionResult> Duplicate() => Task.FromResult<IActionResult>(Ok());
}

public sealed class SyncReturnController : ControllerBase
{
    [ChatTool("sync_return", "Returns synchronously.")]
    [HttpGet("sync")]
    public IActionResult Sync() => Ok();
}

public sealed class ComplexParameterController : ControllerBase
{
    [ChatTool("complex_param", "Takes a complex type.")]
    [HttpGet("complex")]
    public Task<IActionResult> Complex(Guid id) => Task.FromResult<IActionResult>(Ok());
}
