using MediatR;
using Portfolio.Content.Contracts.Models;

namespace Portfolio.Content.Application.Queries;

public class GetContentByLanguageCodeQuery : IRequest<ContentDto>
{
    public GetContentByLanguageCodeQuery(string languageCode)
    {
        LanguageCode = languageCode;
    }

    public string LanguageCode { get; }
}
