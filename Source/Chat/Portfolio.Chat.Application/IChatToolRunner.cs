namespace Portfolio.Chat.Application;

/// <summary>Runs a chat tool for the current request. Implemented by the infrastructure layer.</summary>
public interface IChatToolRunner
{
    /// <exception cref="ChatToolException">Unknown tool, invalid arguments or a failed call.</exception>
    Task<string> ExecuteAsync(string toolName, string? argumentsJson, CancellationToken cancellationToken = default);
}
