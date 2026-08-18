using Portfolio.Content.Contracts.Models;
using MediatR;

namespace Portfolio.Content.Application.Queries;

public class GetLanguagesQuery : IRequest<IEnumerable<LanguageDto>>
{ }