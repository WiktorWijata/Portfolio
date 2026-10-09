using System.Runtime.CompilerServices;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Contracts.Models;
using RescuePC.Portfolio.Api.Results;

namespace Portfolio.Api.UnitTests.Chat;

public class ChatStreamResultTests
{
    private static async IAsyncEnumerable<string> Tokens(params string[] tokens)
    {
        foreach (var token in tokens)
        {
            yield return token;
        }

        await Task.CompletedTask;
    }

    private static async IAsyncEnumerable<string> BreaksAfter(string first, [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        yield return first;
        await Task.Yield();
        throw new IOException("the connection to IntegratorAI was lost");
    }

    private static async Task<(DefaultHttpContext Context, string Body)> Run(ChatStreamDto stream, CancellationToken requestAborted = default)
    {
        var context = new DefaultHttpContext
        {
            RequestServices = new ServiceCollection().AddLogging().BuildServiceProvider(),
            RequestAborted = requestAborted,
        };
        context.Response.Body = new MemoryStream();

        await new ChatStreamResult(stream).ExecuteResultAsync(new ActionContext(context, new RouteData(), new Microsoft.AspNetCore.Mvc.Abstractions.ActionDescriptor()));

        return (context, Encoding.UTF8.GetString(((MemoryStream)context.Response.Body).ToArray()));
    }

    [Theory]
    [InlineData("hello", "data: hello\n\n")]
    [InlineData("a\nb", "data: a\ndata: b\n\n")]
    [InlineData("a\r\nb", "data: a\ndata: b\n\n")]
    [InlineData("", "data: \n\n")]
    [InlineData("- one\n- two\n", "data: - one\ndata: - two\ndata: \n\n")]
    public void A_line_break_in_a_token_never_ends_the_event(string token, string expectedFrame)
    {
        Assert.Equal(expectedFrame, ChatStreamResult.Frame(token));
    }

    [Fact]
    public async Task Streams_the_tokens_and_puts_the_conversation_id_in_a_header()
    {
        var completionId = Guid.NewGuid();

        var (context, body) = await Run(new ChatStreamDto { CompletionId = completionId, Tokens = Tokens("Hi", "there\n- x") });

        Assert.Equal("data: Hi\n\ndata: there\ndata: - x\n\ndata: [DONE]\n\n", body);
        Assert.Equal(completionId.ToString(), context.Response.Headers["Completion-Id"].ToString());
        Assert.Equal("text/event-stream", context.Response.ContentType);
        Assert.Equal("no-cache", context.Response.Headers.CacheControl.ToString());
        Assert.Equal("no", context.Response.Headers["X-Accel-Buffering"].ToString());
    }

    [Fact]
    public async Task An_answer_that_breaks_off_ends_with_an_error_event_and_not_with_done()
    {
        var (_, body) = await Run(new ChatStreamDto { CompletionId = Guid.NewGuid(), Tokens = BreaksAfter("Half an") });

        Assert.Equal($"data: Half an\n\nevent: error\ndata: {ChatStreamResult.InterruptedMessage}\n\n", body);
        Assert.DoesNotContain("[DONE]", body);
        Assert.DoesNotContain("IntegratorAI", body);
    }

    [Fact]
    public async Task A_visitor_who_leaves_is_not_an_error_and_gets_nothing_more()
    {
        using var aborted = new CancellationTokenSource();
        aborted.Cancel();

        var (_, body) = await Run(new ChatStreamDto { CompletionId = Guid.NewGuid(), Tokens = Tokens("never sent") }, aborted.Token);

        Assert.DoesNotContain("error", body);
        Assert.DoesNotContain("never sent", body);
    }
}
