using System.Runtime.CompilerServices;

namespace RescuePC.Portfolio.BuildingBlocks.Application;

/// <summary>One Server-Sent Event: its data and, when it has one, its name (<c>event: tool_call</c>).</summary>
public record ServerSentEvent(string? Name, string Data);

public static class ServerSentEvents
{
    /// <summary>
    /// Reads a Server-Sent Events response and yields the data of each event as it arrives, until the stream ends or
    /// an event carries <paramref name="endMarker"/>. The response is disposed when reading finishes.
    /// </summary>
    public static async IAsyncEnumerable<string> ReadData(
        HttpResponseMessage response,
        string? endMarker = "[DONE]",
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        await foreach (var item in ReadEvents(response, endMarker, cancellationToken))
        {
            yield return item.Data;
        }
    }

    /// <summary>
    /// Like <see cref="ReadData"/>, but each event comes with its name, so that an event of another kind than the
    /// data (a tool call among the tokens of an answer) can be told apart.
    /// </summary>
    public static async IAsyncEnumerable<ServerSentEvent> ReadEvents(
        HttpResponseMessage response,
        string? endMarker = "[DONE]",
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        using (response)
        {
            await using var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
            using var reader = new StreamReader(stream);

            // An event can span several "data:" lines (a token with line breaks); they are joined back with "\n".
            var lines = new List<string>();
            string? name = null;

            while (await reader.ReadLineAsync(cancellationToken) is { } line)
            {
                if (line.Length == 0)
                {
                    var eventName = name;
                    name = null;

                    if (lines.Count == 0)
                    {
                        continue;
                    }

                    var data = string.Join('\n', lines);
                    lines.Clear();

                    if (data == endMarker)
                    {
                        yield break;
                    }

                    if (data.Length > 0)
                    {
                        yield return new ServerSentEvent(eventName, data);
                    }
                }
                else if (line.StartsWith("data:", StringComparison.Ordinal))
                {
                    var value = line["data:".Length..];
                    lines.Add(value.StartsWith(' ') ? value[1..] : value);
                }
                else if (line.StartsWith("event:", StringComparison.Ordinal))
                {
                    name = line["event:".Length..].Trim();
                }
            }
        }
    }
}
