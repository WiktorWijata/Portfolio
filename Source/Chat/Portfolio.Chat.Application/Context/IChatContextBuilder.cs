namespace Portfolio.Chat.Application.Context;

public interface IChatContextBuilder
{
    /// <summary>Builds the context in the language of the current caller (<c>ICallerContext</c>).</summary>
    Task<ChatContextDefinition> BuildAsync(CancellationToken cancellationToken = default);
}
