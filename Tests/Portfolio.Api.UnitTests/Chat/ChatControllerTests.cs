using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Contracts;
using Portfolio.Chat.Contracts.Models;
using RescuePC.Portfolio.Api.Contracts;
using RescuePC.Portfolio.Api.Controllers;
using RescuePC.Portfolio.Api.Results;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Api.UnitTests.Chat;

public class ChatControllerTests
{
    private sealed class FakeChatModule(Func<Task<ChatStreamDto>> answer) : IChatModule
    {
        public List<string> Prompts { get; } = [];
        public Guid? ContinuedId { get; private set; }
        public Guid LastCompletionId { get; private set; }

        public Task<ChatStreamDto> StartCompletion(string prompt, CancellationToken cancellationToken = default)
        {
            Prompts.Add(prompt);
            return Remember(answer());
        }

        public Task<ChatStreamDto> ContinueCompletion(Guid completionId, string prompt, CancellationToken cancellationToken = default)
        {
            ContinuedId = completionId;
            Prompts.Add(prompt);
            return Remember(answer());
        }

        private async Task<ChatStreamDto> Remember(Task<ChatStreamDto> answered)
        {
            var stream = await answered;
            LastCompletionId = stream.CompletionId;
            return stream;
        }

        public Task<IEnumerable<ChatContextSyncDto>> SynchronizeContexts(CancellationToken cancellationToken = default) => throw new NotSupportedException();
    }

    private static ChatStreamDto Answer() => new() { CompletionId = Guid.NewGuid(), Tokens = AsyncEnumerable.Empty<string>() };

    private static (ChatController Controller, FakeChatModule Module) Create(Func<Task<ChatStreamDto>>? answer = null)
    {
        var module = new FakeChatModule(answer ?? (() => Task.FromResult(Answer())));
        // A real HTTP context, so that Problem() and ValidationProblem() behave as they do in the application.
        var services = new ServiceCollection().AddLogging().AddControllers().Services.BuildServiceProvider();
        var controller = new ChatController(module)
        {
            ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext { RequestServices = services } },
        };

        return (controller, module);
    }

    private static int StatusOf(IActionResult result) => result switch
    {
        ObjectResult objectResult => objectResult.StatusCode ?? 200,
        StatusCodeResult statusCodeResult => statusCodeResult.StatusCode,
        _ => 200,
    };

    [Fact]
    public async Task A_message_starts_the_stream()
    {
        var (controller, module) = Create();

        var result = await controller.Create(new ChatRequest { Prompt = "hello" }, CancellationToken.None);

        Assert.IsType<SseResult>(result);
        Assert.Equal("hello", Assert.Single(module.Prompts));
        Assert.Equal(module.LastCompletionId.ToString(), controller.Response.Headers["Completion-Id"].ToString());
    }

    [Fact]
    public async Task Continuing_passes_the_conversation_id_on()
    {
        var (controller, module) = Create();
        var id = Guid.NewGuid();

        var result = await controller.Continue(id, new ChatRequest { Prompt = "and then?" }, CancellationToken.None);

        Assert.IsType<SseResult>(result);
        Assert.Equal(id, module.ContinuedId);
    }

    [Theory]
    [InlineData(null, false)]
    [InlineData("", false)]
    [InlineData("   ", false)]
    [InlineData("hello", true)]
    public void An_empty_message_is_invalid(string? prompt, bool valid)
    {
        var request = new ChatRequest { Prompt = prompt! };

        Assert.Equal(valid, Validator.TryValidateObject(request, new ValidationContext(request), [], validateAllProperties: true));
    }

    [Fact]
    public void A_message_over_the_limit_is_invalid_but_one_at_the_limit_is_not()
    {
        var tooLong = new ChatRequest { Prompt = new string('x', ChatRequest.MaxPromptLength + 1) };
        var atLimit = new ChatRequest { Prompt = new string('x', ChatRequest.MaxPromptLength) };

        Assert.False(Validator.TryValidateObject(tooLong, new ValidationContext(tooLong), [], validateAllProperties: true));
        Assert.True(Validator.TryValidateObject(atLimit, new ValidationContext(atLimit), [], validateAllProperties: true));
    }

    [Fact]
    public void The_chat_endpoints_are_rate_limited()
    {
        foreach (var name in new[] { nameof(ChatController.Create), nameof(ChatController.Continue) })
        {
            var method = typeof(ChatController).GetMethod(name)!;
            var limit = (RateLimitAttribute?)Attribute.GetCustomAttribute(method, typeof(RateLimitAttribute));

            Assert.NotNull(limit);
            Assert.True(limit.PermitLimit <= 20);
        }
    }
}
