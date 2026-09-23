using MediatR;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Queries;

public class GetProfileByLanguageCodeQuery : IRequest<ProfileDto>
{
    public GetProfileByLanguageCodeQuery(string languageCode)
    {
        LanguageCode = Enum.Parse<LanguageCode>(languageCode, ignoreCase: true);
    }

    public LanguageCode LanguageCode { get; }
}
