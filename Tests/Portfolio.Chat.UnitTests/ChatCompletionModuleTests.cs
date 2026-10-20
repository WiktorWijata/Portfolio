using System.IO.Pipelines;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http;
using Portfolio.Chat.Contracts;
using Portfolio.Chat.Infrastructure;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.UnitTests;

public class ChatCompletionModuleTests
{
    private static readonly Guid PolishContext = Guid.NewGuid();
    private static readonly Guid EnglishContext = Guid.NewGuid();

    private sealed class StubHandler(Func<HttpRequestMessage, HttpResponseMessage> respond) : HttpMessageHandler
    {
        public List<(HttpRequestMessage Request, string Body)> Calls { get; } = [];

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Calls.Add((request, request.Content is null ? string.Empty : await request.Content.ReadAsStringAsync(cancellationToken)));

            var response = respond(request);
            response.RequestMessage = request;
            return response;
        }
    }

    private static IChatModule CreateModule(StubHandler handler, string? language = "EN", bool withContexts = true)
    {
        var settings = new Dictionary<string, string?> { ["Assistant:BaseUrl"] = "https://example.test/integratorai/api" };
        if (withContexts)
        {
            settings["Assistant:Contexts:PL"] = PolishContext.ToString();
            settings["Assistant:Contexts:EN"] = EnglishContext.ToString();
        }

        var configuration = new ConfigurationBuilder().AddInMemoryCollection(settings).Build();
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddCallerContext();
        services.AddAssistantClient(configuration);
        services.AddChat([typeof(ValidController)]);
        services.ConfigureAll<HttpClientFactoryOptions>(options => options.HttpMessageHandlerBuilderActions.Add(builder => builder.PrimaryHandler = handler));

        var scope = services.BuildServiceProvider().CreateScope().ServiceProvider;
        if (language is not null)
        {
            scope.GetRequiredService<CallerLanguageOverride>().LanguageCode = language;
        }

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

    private static async Task<List<string>> ReadAllAsync(IAsyncEnumerable<string> tokens)
    {
        var all = new List<string>();
        await foreach (var token in tokens)
        {
            all.Add(token);
        }

        return all;
    }

    [Fact]
    public async Task Starting_sends_the_context_of_the_language_and_returns_the_id_and_the_tokens()
    {
        var completionId = Guid.NewGuid();
        var handler = new StubHandler(_ => Sse("data: Hel\n\ndata: lo\n\ndata: [DONE]\n\n", completionId));

        var stream = await CreateModule(handler, "EN").StartCompletion("hi there");

        Assert.Equal(completionId, stream.CompletionId);
        Assert.Equal(["Hel", "lo"], await ReadAllAsync(stream.Tokens));
        var (request, body) = Assert.Single(handler.Calls);
        Assert.Equal("https://example.test/integratorai/api/streamchat/completions", request.RequestUri!.ToString());
        Assert.Equal(EnglishContext.ToString(), Assert.Single(request.Headers.GetValues("Context-Id")));
        Assert.Contains("\"prompt\":\"hi there\"", body);
    }

    [Theory]
    [InlineData("PL")]
    [InlineData(null)]
    public async Task Starting_in_polish_or_by_default_uses_the_polish_context(string? language)
    {
        var handler = new StubHandler(_ => Sse("data: [DONE]\n\n", Guid.NewGuid()));

        await CreateModule(handler, language).StartCompletion("czesc");

        Assert.Equal(PolishContext.ToString(), Assert.Single(handler.Calls[0].Request.Headers.GetValues("Context-Id")));
    }

    [Fact]
    public async Task A_language_without_a_context_fails_without_calling_IntegratorAI()
    {
        var handler = new StubHandler(_ => Sse("data: [DONE]\n\n", Guid.NewGuid()));

        await Assert.ThrowsAsync<InvalidOperationException>(() => CreateModule(handler, withContexts: false).StartCompletion("hi"));

        Assert.Empty(handler.Calls);
    }

    [Fact]
    public async Task Line_breaks_in_a_token_are_restored_and_empty_events_are_skipped()
    {
        const string body = "data: Intro:\ndata: - one\ndata: - two\n\n"
                            + "data: \n\n"
                            + "data:no space\n\n"
                            + "data: [DONE]\n\n"
                            + "data: after the end\n\n";
        var handler = new StubHandler(_ => Sse(body, Guid.NewGuid()));

        var stream = await CreateModule(handler).StartCompletion("hi");

        Assert.Equal(["Intro:\n- one\n- two", "no space"], await ReadAllAsync(stream.Tokens));
    }

    [Fact]
    public async Task Other_fields_and_comments_in_the_stream_are_ignored()
    {
        var handler = new StubHandler(_ => Sse(": keep-alive\n\nevent: ping\nid: 7\ndata: text\n\ndata: [DONE]\n\n", Guid.NewGuid()));

        var stream = await CreateModule(handler).StartCompletion("hi");

        Assert.Equal(["text"], await ReadAllAsync(stream.Tokens));
    }

    [Fact]
    public async Task The_answer_is_passed_on_while_it_is_still_being_written()
    {
        // If anything buffered the whole response, StartCompletion would never return, because the pipe is not
        // completed until the first token has been read.
        var pipe = new Pipe();
        var handler = new StubHandler(_ =>
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK) { Content = new StreamContent(pipe.Reader.AsStream()) };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/event-stream");
            response.Headers.Add("Completion-Id", Guid.NewGuid().ToString());
            return response;
        });

        var stream = await CreateModule(handler).StartCompletion("hi").WaitAsync(TimeSpan.FromSeconds(10));
        await using var enumerator = stream.Tokens.GetAsyncEnumerator();

        await pipe.Writer.WriteAsync(Encoding.UTF8.GetBytes("data: first\n\n"));
        Assert.True(await enumerator.MoveNextAsync().AsTask().WaitAsync(TimeSpan.FromSeconds(10)));
        Assert.Equal("first", enumerator.Current);

        await pipe.Writer.WriteAsync(Encoding.UTF8.GetBytes("data: second\n\ndata: [DONE]\n\n"));
        await pipe.Writer.CompleteAsync();
        Assert.True(await enumerator.MoveNextAsync().AsTask().WaitAsync(TimeSpan.FromSeconds(10)));
        Assert.Equal("second", enumerator.Current);
        Assert.False(await enumerator.MoveNextAsync());
    }

    [Fact]
    public async Task A_response_without_the_conversation_id_fails()
    {
        var handler = new StubHandler(_ => Sse("data: [DONE]\n\n", completionId: null));

        await Assert.ThrowsAsync<InvalidOperationException>(() => CreateModule(handler).StartCompletion("hi"));
    }

    [Fact]
    public async Task Continuing_posts_to_the_conversation_and_keeps_its_id()
    {
        var completionId = Guid.NewGuid();
        var handler = new StubHandler(_ => Sse("data: more\n\ndata: [DONE]\n\n"));

        var stream = await CreateModule(handler).ContinueCompletion(completionId, "and then?");

        Assert.Equal(completionId, stream.CompletionId);
        Assert.Equal(["more"], await ReadAllAsync(stream.Tokens));
        var (request, body) = Assert.Single(handler.Calls);
        Assert.Equal($"https://example.test/integratorai/api/streamchat/completions/{completionId}", request.RequestUri!.ToString());
        Assert.False(request.Headers.Contains("Context-Id"));
        Assert.Contains("\"prompt\":\"and then?\"", body);
    }
}
