using System.Text;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.BuildingBlocks.UnitTests;

public class ServerSentEventsTests
{
    private static HttpResponseMessage Sse(string body)
        => new(System.Net.HttpStatusCode.OK) { Content = new StringContent(body, Encoding.UTF8, "text/event-stream") };

    private static async Task<List<ServerSentEvent>> ReadAsync(string body)
    {
        var all = new List<ServerSentEvent>();
        await foreach (var item in ServerSentEvents.ReadEvents(Sse(body)))
        {
            all.Add(item);
        }

        return all;
    }

    [Fact]
    public async Task An_event_without_a_name_has_none()
    {
        var events = await ReadAsync("data: token\n\ndata: [DONE]\n\n");

        var item = Assert.Single(events);
        Assert.Null(item.Name);
        Assert.Equal("token", item.Data);
    }

    [Fact]
    public async Task The_name_belongs_to_the_event_it_precedes_and_not_to_the_next_one()
    {
        var events = await ReadAsync("event: tool_call\ndata: {\"id\":\"a\"}\n\ndata: next\n\ndata: [DONE]\n\n");

        Assert.Equal([("tool_call", "{\"id\":\"a\"}"), (null, "next")], events.Select(e => (e.Name, e.Data)).ToArray());
    }

    [Fact]
    public async Task A_name_without_data_does_not_leak_into_the_next_event()
    {
        var events = await ReadAsync("event: ping\n\ndata: token\n\n");

        Assert.Null(Assert.Single(events).Name);
    }

    [Fact]
    public async Task Reading_data_still_gives_only_the_data_of_every_event()
    {
        var tokens = new List<string>();
        await foreach (var token in ServerSentEvents.ReadData(Sse("event: x\ndata: a\n\ndata: b\n\ndata: [DONE]\n\ndata: after\n\n")))
        {
            tokens.Add(token);
        }

        Assert.Equal(["a", "b"], tokens);
    }
}
