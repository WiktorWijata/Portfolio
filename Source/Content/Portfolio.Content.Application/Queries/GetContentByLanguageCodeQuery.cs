using MediatR;
using Portfolio.Content.Contracts.Models;
using Portfolio.Content.Domain;

namespace Portfolio.Content.Application.Queries;

public class GetContentByLanguageCodeQuery : IRequest<ContentDto>
{
    public GetContentByLanguageCodeQuery(string languageCode)
    {
        LanguageCode = Enum.Parse<LanguageCode>(languageCode, ignoreCase: true);
    }

    public LanguageCode LanguageCode { get; }
}
