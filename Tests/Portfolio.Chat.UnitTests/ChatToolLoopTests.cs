using System.Net;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http;
using Portfolio.Chat.Application;
using Portfolio.Chat.Contracts;
using Portfolio.Chat.Infrastructure;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.UnitTests;

/// <summary>The model asks for tools in the stream of IntegratorAI, the tools are run here, the results go back.</summary>
public class ChatToolLoopTests
{
    private static readonly Guid ContextId = Guid.NewGuid();

    private sealed class StubHandler(Func<int, HttpRequestMessage, HttpResponseMessage> respond) : HttpMessageHandler
    {
        public List<(HttpRequestMessage Request, string Body)> Calls { get; } = [];

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Calls.Add((request, request.Content is null ? string.Empty : await request.Content.ReadAsStringAsync(cancellationToken)));

            var response = respond(Calls.Count - 1, request);
            response.RequestMessage = request;
            return response;
        }
    }

    private static IChatModule CreateModule(StubHandler handler)
    {
        var settings = new Dictionary<string, string?>
        {
            ["Assistant:BaseUrl"] = "https://example.test/integratorai/api",
            ["Assistant:Contexts:EN"] = ContextId.ToString(),
        };

        var configuration = new ConfigurationBuilder().AddInMemoryCollection(settings).Build();
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddCallerContext();
        services.AddAssistantClient(configuration);
        services.AddSingleton<GreetingService>();
        services.AddChat([typeof(ValidController)]);
        services.ConfigureAll<HttpClientFactoryOptions>(options => options.HttpMessageHandlerBuilderActions.Add(builder => builder.PrimaryHandler = handler));

        var scope = services.BuildServiceProvider().CreateScope().ServiceProvider;
        scope.GetRequiredService<CallerLanguageOverride>().LanguageCode = "EN";

        return scope.GetRequiredService<IChatModule>();
    }

    private static HttpResponseMessage Sse(string body, Guid? completionId = null, HttpStatusCode status = HttpStatusCode.OK)
    {
        var response = new HttpResponseMessage(status) { Content = new StringContent(body, Encoding.UTF8, "text/event-stream") };
        if (completionId is { } id)
        {
            response.Headers.Add("Completion-Id", id.ToString());
        }

        return response;
    }

    private static string ToolCall(string id, string name, string arguments)
        => $"event: tool_call\ndata: {{\"id\":\"{id}\",\"name\":\"{name}\",\"arguments\":{arguments}}}\n\n";

    private static async Task<List<string>> ReadAllAsync(IAsyncEnumerable<string> tokens)
    {
        var all = new List<string>();
        await foreach (var token in tokens)
        {
            all.Add(token);
        }

        return all;
    }

    private static StubHandler Script(Guid completionId, params string[] bodies)
        => new((index, _) => Sse(bodies[Math.Min(index, bodies.Length - 1)], index == 0 ? completionId : null));

    [Fact]
    public async Task A_tool_the_model_asks_for_is_run_and_the_answer_follows_in_the_same_stream()
    {
        var completionId = Guid.NewGuid();
        var handler = Script(
            completionId,
            "data: Let me check.\n\n" + ToolCall("call_1", "find_item", "{\"name\":\"lamp\",\"limit\":2}") + "data: [DONE]\n\n",
            "data: Found a lamp.\n\ndata: [DONE]\n\n");

        var stream = await CreateModule(handler).StartCompletion("find a lamp");
        var tokens = await ReadAllAsync(stream.Tokens);

        Assert.Equal(completionId, stream.CompletionId);
        Assert.Equal(["Let me check.", "Found a lamp."], tokens);
        Assert.Equal(2, handler.Calls.Count);
        var (request, body) = handler.Calls[1];
        Assert.Equal($"https://example.test/integratorai/api/streamchat/completions/{completionId}/tool-results", request.RequestUri!.ToString());
        Assert.Equal(HttpMethod.Post, request.Method);
        Assert.Contains("\"toolCallId\":\"call_1\"", body);
        Assert.Contains("\"isError\":false", body);
        Assert.Contains("name", body);
        Assert.Contains("lamp", body);
    }

    [Fact]
    public async Task The_tool_call_event_is_not_shown_to_the_visitor()
    {
        var handler = Script(
            Guid.NewGuid(),
            ToolCall("call_1", "get_greeting", "{}") + "data: [DONE]\n\n",
            "data: Hello!\n\ndata: [DONE]\n\n");

        var stream = await CreateModule(handler).StartCompletion("hi");

        Assert.Equal(["Hello!"], await ReadAllAsync(stream.Tokens));
    }

    [Fact]
    public async Task Several_tool_calls_are_answered_together_in_the_order_they_were_asked()
    {
        var handler = Script(
            Guid.NewGuid(),
            ToolCall("a", "get_greeting", "{}") + ToolCall("b", "find_item", "{\"name\":\"x\"}") + "data: [DONE]\n\n",
            "data: Done.\n\ndata: [DONE]\n\n");

        var stream = await CreateModule(handler).StartCompletion("both");
        await ReadAllAsync(stream.Tokens);

        Assert.Equal(2, handler.Calls.Count);
        var body = handler.Calls[1].Body;
        Assert.True(body.IndexOf("\"toolCallId\":\"a\"", StringComparison.Ordinal) < body.IndexOf("\"toolCallId\":\"b\"", StringComparison.Ordinal));
        Assert.Contains("hello", body);
    }

    [Fact]
    public async Task A_tool_the_registry_does_not_know_is_answered_with_an_error_for_the_model()
    {
        var handler = Script(
            Guid.NewGuid(),
            ToolCall("call_1", "drop_everything", "{}") + "data: [DONE]\n\n",
            "data: I cannot do that.\n\ndata: [DONE]\n\n");

        var stream = await CreateModule(handler).StartCompletion("do it");

        Assert.Equal(["I cannot do that."], await ReadAllAsync(stream.Tokens));
        var body = handler.Calls[1].Body;
        Assert.Contains("\"isError\":true", body);
        Assert.Contains("Unknown tool", body);
    }

    [Fact]
    public async Task Missing_arguments_are_told_to_the_model_as_an_error()
    {
        var handler = Script(
            Guid.NewGuid(),
            ToolCall("call_1", "find_item", "{}") + "data: [DONE]\n\n",
            "data: Which one?\n\ndata: [DONE]\n\n");

        var stream = await CreateModule(handler).StartCompletion("find");
        await ReadAllAsync(stream.Tokens);

        var body = handler.Calls[1].Body;
        Assert.Contains("\"isError\":true", body);
        Assert.Contains("Missing required argument", body);
    }

    [Fact]
    public async Task A_tool_that_blows_up_does_not_leak_its_details_to_the_model()
    {
        var handler = Script(
            Guid.NewGuid(),
            ToolCall("call_1", "get_broken", "{}") + "data: [DONE]\n\n",
            "data: Sorry.\n\ndata: [DONE]\n\n");

        var stream = await CreateModule(handler).StartCompletion("broken");
        await ReadAllAsync(stream.Tokens);

        var body = handler.Calls[1].Body;
        Assert.Contains("\"isError\":true", body);
        Assert.DoesNotContain("secret internal detail", body);
    }

    [Fact]
    public async Task The_model_may_ask_again_after_the_results()
    {
        var handler = Script(
            Guid.NewGuid(),
            ToolCall("call_1", "get_greeting", "{}") + "data: [DONE]\n\n",
            ToolCall("call_2", "find_item", "{\"name\":\"y\"}") + "data: [DONE]\n\n",
            "data: All set.\n\ndata: [DONE]\n\n");

        var stream = await CreateModule(handler).StartCompletion("two steps");

        Assert.Equal(["All set."], await ReadAllAsync(stream.Tokens));
        Assert.Equal(3, handler.Calls.Count);
        Assert.Contains("\"toolCallId\":\"call_2\"", handler.Calls[2].Body);
    }

    [Fact]
    public async Task A_model_that_never_stops_asking_is_refused_and_the_stream_fails()
    {
        var handler = new StubHandler((index, _) => Sse(ToolCall($"call_{index}", "get_greeting", "{}") + "data: [DONE]\n\n", index == 0 ? Guid.NewGuid() : null));

        var stream = await CreateModule(handler).StartCompletion("loop");

        await Assert.ThrowsAsync<InvalidOperationException>(() => ReadAllAsync(stream.Tokens));
        Assert.Equal(1 + ChatAnswerStreamer.MaxToolRounds + 1, handler.Calls.Count);
        var last = handler.Calls[^1].Body;
        Assert.Contains("\"isError\":true", last);
        Assert.Contains("Too many tool calls", last);
        Assert.DoesNotContain("Too many tool calls", handler.Calls[ChatAnswerStreamer.MaxToolRounds - 1].Body);
    }

    [Fact]
    public async Task Continuing_a_conversation_runs_tools_too()
    {
        var completionId = Guid.NewGuid();
        var handler = new StubHandler((index, _) => index == 0
            ? Sse(ToolCall("call_1", "get_greeting", "{}") + "data: [DONE]\n\n")
            : Sse("data: Hi again.\n\ndata: [DONE]\n\n"));

        var stream = await CreateModule(handler).ContinueCompletion(completionId, "and now?");

        Assert.Equal(["Hi again."], await ReadAllAsync(stream.Tokens));
        Assert.EndsWith($"/streamchat/completions/{completionId}", handler.Calls[0].Request.RequestUri!.ToString());
        Assert.EndsWith($"/streamchat/completions/{completionId}/tool-results", handler.Calls[1].Request.RequestUri!.ToString());
    }

    [Fact]
    public async Task When_IntegratorAI_rejects_the_results_the_stream_fails()
    {
        var handler = new StubHandler((index, _) => index == 0
            ? Sse(ToolCall("call_1", "get_greeting", "{}") + "data: [DONE]\n\n", Guid.NewGuid())
            : Sse(string.Empty, status: HttpStatusCode.Conflict));

        var stream = await CreateModule(handler).StartCompletion("hi");

        await Assert.ThrowsAsync<HttpRequestException>(() => ReadAllAsync(stream.Tokens));
    }

    [Fact]
    public async Task An_answer_without_tool_calls_makes_no_further_request()
    {
        var handler = Script(Guid.NewGuid(), "data: Plain answer.\n\ndata: [DONE]\n\n");

        var stream = await CreateModule(handler).StartCompletion("hi");
        await ReadAllAsync(stream.Tokens);

        Assert.Single(handler.Calls);
    }
}
