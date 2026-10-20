using MediatR;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application.Commands;

public class SynchronizeChatContextsCommand : IRequest<IEnumerable<ChatContextSyncDto>>
{ }
