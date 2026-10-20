using MediatR;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application.Commands;

public class ContinueChatCompletionCommand : IRequest<ChatStreamDto>
{
    public ContinueChatCompletionCommand(Guid completionId, string prompt)
    {
        CompletionId = completionId;
        Prompt = prompt;
    }

    public Guid CompletionId { get; }
    public string Prompt { get; }
}
