using System.Net;
using System.Text;
using IntegratorAI.Api.Contracts.Chat;
using IntegratorAI.Api.Contracts.Context;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http;
using Portfolio.Chat.Infrastructure;

namespace Portfolio.Chat.UnitTests;

public class AssistantClientTests
{
    private sealed class StubHandler(Func<HttpRequestMessage, HttpResponseMessage> respond) : HttpMessageHandler
    {
        public List<(HttpRequestMessage Request, string Body)> Calls { get; } = [];

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var body = request.Content is null ? string.Empty : await request.Content.ReadAsStringAsync(cancellationToken);
            Calls.Add((request, body));
            return respond(request);
        }
    }

    private static ServiceProvider CreateProvider(StubHandler handler, string? baseUrl = "https://example.test/integratorai/api")
    {
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(baseUrl is null ? [] : new Dictionary<string, string?> { ["Assistant:BaseUrl"] = baseUrl })
            .Build();

        var services = new ServiceCollection();
        services.AddAssistantClient(configuration);
        services.ConfigureAll<HttpClientFactoryOptions>(options => options.HttpMessageHandlerBuilderActions.Add(builder => builder.PrimaryHandler = handler));

        return services.BuildServiceProvider();
    }

    private static HttpResponseMessage Json(string json) => new(HttpStatusCode.OK)
    {
        Content = new StringContent(json, Encoding.UTF8, "application/json"),
    };

    [Fact]
    public async Task Creating_a_context_posts_under_the_api_path_base_and_returns_the_id()
    {
        var id = Guid.NewGuid();
        var handler = new StubHandler(_ => Json($"\"{id}\""));
        using var provider = CreateProvider(handler);

        var created = await provider.GetRequiredService<IContextApi>().CreateContext(new ContextRequest { Name = "n", SystemRole = "r" });

        Assert.Equal(id, created);
        var (request, body) = Assert.Single(handler.Calls);
        Assert.Equal(HttpMethod.Post, request.Method);
        Assert.Equal("https://example.test/integratorai/api/context", request.RequestUri!.ToString());
        Assert.Contains("\"name\":\"n\"", body);
    }

    [Fact]
    public async Task Updating_a_context_puts_to_its_id()
    {
        var id = Guid.NewGuid();
        var handler = new StubHandler(_ => new HttpResponseMessage(HttpStatusCode.NoContent));
        using var provider = CreateProvider(handler);

        await provider.GetRequiredService<IContextApi>().UpdateContext(id, new ContextRequest { Name = "n", SystemRole = "r", DomainContext = "data" });

        var (request, body) = Assert.Single(handler.Calls);
        Assert.Equal(HttpMethod.Put, request.Method);
        Assert.Equal($"https://example.test/integratorai/api/context/{id}", request.RequestUri!.ToString());
        Assert.Contains("\"domainContext\":\"data\"", body);
    }

    [Fact]
    public async Task A_trailing_slash_in_the_base_url_makes_no_difference()
    {
        var handler = new StubHandler(_ => new HttpResponseMessage(HttpStatusCode.NoContent));
        using var provider = CreateProvider(handler, baseUrl: "https://example.test/integratorai/api/");

        await provider.GetRequiredService<IContextApi>().UpdateContext(Guid.Empty, new ContextRequest());

        Assert.Equal($"https://example.test/integratorai/api/context/{Guid.Empty}", handler.Calls.Single().Request.RequestUri!.ToString());
    }

    [Fact]
    public async Task A_streamed_completion_sends_the_context_id_and_exposes_the_completion_id_header()
    {
        var contextId = Guid.NewGuid();
        var completionId = Guid.NewGuid();
        var handler = new StubHandler(_ =>
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK) { Content = new StringContent("data: hi\n\ndata: [DONE]\n\n", Encoding.UTF8, "text/event-stream") };
            response.Headers.Add("Completion-Id", completionId.ToString());
            return response;
        });
        using var provider = CreateProvider(handler);

        using var response = await provider.GetRequiredService<IStreamChatApi>().CreateCompletion(new CompletionRequest { Prompt = "hello" }, contextId);

        var (request, body) = Assert.Single(handler.Calls);
        Assert.Equal("https://example.test/integratorai/api/streamchat/completions", request.RequestUri!.ToString());
        Assert.Equal(contextId.ToString(), Assert.Single(request.Headers.GetValues("Context-Id")));
        Assert.Contains("\"prompt\":\"hello\"", body);
        Assert.Equal(completionId.ToString(), Assert.Single(response.Headers.GetValues("Completion-Id")));
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("not a url")]
    public void A_missing_or_invalid_base_url_is_reported_on_first_use_not_at_startup(string? baseUrl)
    {
        using var provider = CreateProvider(new StubHandler(_ => Json("{}")), baseUrl);

        var exception = Assert.Throws<InvalidOperationException>(() => provider.GetRequiredService<IContextApi>());

        Assert.Contains("Assistant:BaseUrl", exception.Message);
    }
}
