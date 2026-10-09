using System.IO.Pipelines;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http;
using Portfolio.Chat.Application;
using Portfolio.Chat.Infrastructure;

namespace Portfolio.Chat.UnitTests;

public class IntegratorAIChatGatewayTests
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

    private static IChatCompletionGateway CreateGateway(StubHandler handler, bool withContexts = true, string? baseUrl = "https://example.test/integratorai/api")
    {
        var settings = new Dictionary<string, string?> { ["IntegratorAI:BaseUrl"] = baseUrl };
        if (withContexts)
        {
            settings["IntegratorAI:Contexts:PL"] = PolishContext.ToString();
            settings["IntegratorAI:Contexts:EN"] = EnglishContext.ToString();
        }

        var configuration = new ConfigurationBuilder().AddInMemoryCollection(settings).Build();
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddIntegratorAIClient(configuration);
        services.AddScoped<IChatCompletionGateway, IntegratorAIChatGateway>();
        services.ConfigureAll<HttpClientFactoryOptions>(options => options.HttpMessageHandlerBuilderActions.Add(builder => builder.PrimaryHandler = handler));

        return services.BuildServiceProvider().CreateScope().ServiceProvider.GetRequiredService<IChatCompletionGateway>();
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

        var stream = await CreateGateway(handler).StartAsync("EN", "hi there");

        Assert.Equal(completionId, stream.CompletionId);
        Assert.Equal(["Hel", "lo"], await ReadAllAsync(stream.Tokens));
        var (request, body) = Assert.Single(handler.Calls);
        Assert.Equal("https://example.test/integratorai/api/streamchat/completions", request.RequestUri!.ToString());
        Assert.Equal(EnglishContext.ToString(), Assert.Single(request.Headers.GetValues("Context-Id")));
        Assert.Contains("\"prompt\":\"hi there\"", body);
    }

    [Fact]
    public async Task Starting_in_another_language_uses_that_languages_context()
    {
        var handler = new StubHandler(_ => Sse("data: [DONE]\n\n", Guid.NewGuid()));

        await CreateGateway(handler).StartAsync("PL", "czesc");

        Assert.Equal(PolishContext.ToString(), Assert.Single(handler.Calls[0].Request.Headers.GetValues("Context-Id")));
    }

    [Fact]
    public async Task A_language_without_a_context_is_reported_as_unavailable_without_calling_IntegratorAI()
    {
        var handler = new StubHandler(_ => Sse("data: [DONE]\n\n", Guid.NewGuid()));

        await Assert.ThrowsAsync<ChatUnavailableException>(() => CreateGateway(handler, withContexts: false).StartAsync("PL", "hi"));

        Assert.Empty(handler.Calls);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    public async Task A_missing_base_url_is_reported_as_unavailable_not_as_a_crash(string? baseUrl)
    {
        var handler = new StubHandler(_ => Sse("data: [DONE]\n\n", Guid.NewGuid()));

        await Assert.ThrowsAsync<ChatUnavailableException>(() => CreateGateway(handler, baseUrl: baseUrl).StartAsync("PL", "hi"));

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

        var stream = await CreateGateway(handler).StartAsync("PL", "hi");

        Assert.Equal(["Intro:\n- one\n- two", "no space"], await ReadAllAsync(stream.Tokens));
    }

    [Fact]
    public async Task Other_fields_and_comments_in_the_stream_are_ignored()
    {
        var handler = new StubHandler(_ => Sse(": keep-alive\n\nevent: ping\nid: 7\ndata: text\n\ndata: [DONE]\n\n", Guid.NewGuid()));

        var stream = await CreateGateway(handler).StartAsync("PL", "hi");

        Assert.Equal(["text"], await ReadAllAsync(stream.Tokens));
    }

    [Fact]
    public async Task The_answer_is_passed_on_while_it_is_still_being_written()
    {
        // If anything buffered the whole response, StartAsync would never return, because the pipe is not completed
        // until the first token has been read.
        var pipe = new Pipe();
        var handler = new StubHandler(_ =>
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK) { Content = new StreamContent(pipe.Reader.AsStream()) };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/event-stream");
            response.Headers.Add("Completion-Id", Guid.NewGuid().ToString());
            return response;
        });

        var stream = await CreateGateway(handler).StartAsync("PL", "hi").WaitAsync(TimeSpan.FromSeconds(10));
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
    public async Task A_response_without_the_conversation_id_is_a_provider_failure()
    {
        var handler = new StubHandler(_ => Sse("data: [DONE]\n\n", completionId: null));

        await Assert.ThrowsAsync<ChatProviderException>(() => CreateGateway(handler).StartAsync("PL", "hi"));
    }

    [Theory]
    [InlineData(HttpStatusCode.BadGateway)]
    [InlineData(HttpStatusCode.InternalServerError)]
    [InlineData(HttpStatusCode.BadRequest)]
    public async Task An_error_from_IntegratorAI_is_a_provider_failure(HttpStatusCode status)
    {
        var handler = new StubHandler(_ => Sse("""{"title":"nope"}""", status: status));

        await Assert.ThrowsAsync<ChatProviderException>(() => CreateGateway(handler).StartAsync("PL", "hi"));
    }

    [Fact]
    public async Task IntegratorAI_being_unreachable_is_a_provider_failure()
    {
        var handler = new StubHandler(_ => throw new HttpRequestException("connection refused"));

        var exception = await Assert.ThrowsAsync<ChatProviderException>(() => CreateGateway(handler).StartAsync("PL", "hi"));

        Assert.NotNull(exception.InnerException);
    }

    [Fact]
    public async Task Continuing_posts_to_the_conversation_and_keeps_its_id()
    {
        var completionId = Guid.NewGuid();
        var handler = new StubHandler(_ => Sse("data: more\n\ndata: [DONE]\n\n"));

        var stream = await CreateGateway(handler).ContinueAsync(completionId, "and then?");

        Assert.Equal(completionId, stream.CompletionId);
        Assert.Equal(["more"], await ReadAllAsync(stream.Tokens));
        var (request, body) = Assert.Single(handler.Calls);
        Assert.Equal($"https://example.test/integratorai/api/streamchat/completions/{completionId}", request.RequestUri!.ToString());
        Assert.False(request.Headers.Contains("Context-Id"));
        Assert.Contains("\"prompt\":\"and then?\"", body);
    }

    [Fact]
    public async Task Continuing_an_unknown_conversation_is_reported_as_not_found()
    {
        var completionId = Guid.NewGuid();
        var handler = new StubHandler(_ => Sse("{}", status: HttpStatusCode.NotFound));

        var exception = await Assert.ThrowsAsync<ChatCompletionNotFoundException>(() => CreateGateway(handler).ContinueAsync(completionId, "hi"));

        Assert.Equal(completionId, exception.CompletionId);
    }

    [Fact]
    public async Task A_404_when_starting_is_not_mistaken_for_a_missing_conversation()
    {
        // 404 on start means the configured context does not exist in IntegratorAI: that is our problem, not the visitor's.
        var handler = new StubHandler(_ => Sse("{}", status: HttpStatusCode.NotFound));

        await Assert.ThrowsAsync<ChatProviderException>(() => CreateGateway(handler).StartAsync("PL", "hi"));
    }
}
