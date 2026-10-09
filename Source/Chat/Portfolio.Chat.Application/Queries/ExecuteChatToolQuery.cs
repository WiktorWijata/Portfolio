using MediatR;

namespace Portfolio.Chat.Application.Queries;

/// <summary>Runs a read-only tool. It is a query because tools only expose [HttpGet] actions.</summary>
public class ExecuteChatToolQuery : IRequest<string>
{
    public ExecuteChatToolQuery(string toolName, string? argumentsJson)
    {
        ToolName = toolName;
        ArgumentsJson = argumentsJson;
    }

    public string ToolName { get; }
    public string? ArgumentsJson { get; }
}
