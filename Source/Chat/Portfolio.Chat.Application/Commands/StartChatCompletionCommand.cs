using MediatR;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application.Commands;

public class StartChatCompletionCommand : IRequest<ChatStreamDto>
{
    public StartChatCompletionCommand(string prompt)
    {
        Prompt = prompt;
    }

    public string Prompt { get; }
}
