using MediatR;
using Portfolio.Chat.Contracts.Models;

namespace Portfolio.Chat.Application.Queries;

public class GetChatToolsQuery : IRequest<IEnumerable<ChatToolDto>>
{ }
