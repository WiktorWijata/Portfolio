using IntegratorAI.Api.Contracts.Context;
using MediatR;

namespace Portfolio.Chat.Application.Queries;

/// <summary>Builds the assistant's context in the language of the current caller (<c>ICallerContext</c>).</summary>
public class BuildChatContextQuery : IRequest<ContextRequest>
{ }
