using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Portfolio.Chat.Application;
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

        public Task<ChatStreamDto> StartCompletion(string prompt, CancellationToken cancellationToken = default)
        {
            Prompts.Add(prompt);
            return answer();
        }

        public Task<ChatStreamDto> ContinueCompletion(Guid completionId, string prompt, CancellationToken cancellationToken = default)
        {
            ContinuedId = completionId;
            Prompts.Add(prompt);
            return answer();
        }

        public Task<IEnumerable<ChatToolDto>> GetTools(CancellationToken cancellationToken = default) => throw new NotSupportedException();

        public Task<string> ExecuteTool(string toolName, string argumentsJson, CancellationToken cancellationToken = default) => throw new NotSupportedException();

        public Task<IEnumerable<ChatContextSyncDto>> SynchronizeContexts(CancellationToken cancellationToken = default) => throw new NotSupportedException();
    }

    private static ChatStreamDto Answer() => new() { CompletionId = Guid.NewGuid(), Tokens = AsyncEnumerable.Empty<string>() };

    private static (ChatController Controller, FakeChatModule Module) Create(Func<Task<ChatStreamDto>>? answer = null)
    {
        var module = new FakeChatModule(answer ?? (() => Task.FromResult(Answer())));
        // A real HTTP context, so that Problem() and ValidationProblem() behave as they do in the application.
        var services = new ServiceCollection().AddLogging().AddControllers().Services.BuildServiceProvider();
        var controller = new ChatController(module, NullLogger<ChatController>.Instance)
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
    public async Task A_message_starts_the_stream_and_is_trimmed()
    {
        var (controller, module) = Create();

        var result = await controller.Create(new ChatRequest { Prompt = "  hello  " });

        Assert.IsType<ChatStreamResult>(result);
        Assert.Equal("hello", Assert.Single(module.Prompts));
    }

    [Fact]
    public async Task Continuing_passes_the_conversation_id_on()
    {
        var (controller, module) = Create();
        var id = Guid.NewGuid();

        var result = await controller.Continue(id, new ChatRequest { Prompt = "and then?" });

        Assert.IsType<ChatStreamResult>(result);
        Assert.Equal(id, module.ContinuedId);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public async Task An_empty_message_is_rejected_without_calling_the_assistant(string? prompt)
    {
        var (controller, module) = Create();

        var result = await controller.Create(new ChatRequest { Prompt = prompt! });

        Assert.Equal(400, StatusOf(result));
        Assert.Empty(module.Prompts);
    }

    [Fact]
    public async Task A_message_over_the_limit_is_rejected_but_one_at_the_limit_is_not()
    {
        var (controller, module) = Create();

        var tooLong = await controller.Create(new ChatRequest { Prompt = new string('x', ChatController.MaxPromptLength + 1) });
        var atLimit = await controller.Create(new ChatRequest { Prompt = new string('x', ChatController.MaxPromptLength) });

        Assert.Equal(400, StatusOf(tooLong));
        Assert.IsType<ChatStreamResult>(atLimit);
        Assert.Single(module.Prompts);
    }

    [Theory]
    [MemberData(nameof(Failures))]
    public async Task Failures_become_the_matching_status_without_leaking_details(Exception failure, int expectedStatus)
    {
        var (controller, _) = Create(() => Task.FromException<ChatStreamDto>(failure));

        var result = await controller.Create(new ChatRequest { Prompt = "hi" });

        Assert.Equal(expectedStatus, StatusOf(result));
        var problem = Assert.IsType<ProblemDetails>(Assert.IsType<ObjectResult>(result).Value);
        Assert.DoesNotContain("secret", problem.Detail);
        Assert.DoesNotContain("secret", problem.Title);
    }

    public static TheoryData<Exception, int> Failures() => new()
    {
        { new ChatUnavailableException("secret: IntegratorAI:BaseUrl is not configured"), 503 },
        { new ChatProviderException("secret: IntegratorAI answered 402"), 502 },
        { new ChatCompletionNotFoundException(Guid.NewGuid()), 404 },
    };

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
