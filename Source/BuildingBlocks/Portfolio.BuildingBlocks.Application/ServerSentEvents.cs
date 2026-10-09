using System.Runtime.CompilerServices;

namespace RescuePC.Portfolio.BuildingBlocks.Application;

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
        using (response)
        {
            await using var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
            using var reader = new StreamReader(stream);

            // An event can span several "data:" lines (a token with line breaks); they are joined back with "\n".
            var lines = new List<string>();

            while (await reader.ReadLineAsync(cancellationToken) is { } line)
            {
                if (line.Length == 0)
                {
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
                        yield return data;
                    }
                }
                else if (line.StartsWith("data:", StringComparison.Ordinal))
                {
                    var value = line["data:".Length..];
                    lines.Add(value.StartsWith(' ') ? value[1..] : value);
                }
            }
        }
    }
}
