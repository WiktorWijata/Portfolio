using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain.Repositories;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetLanguagesQueryHandler : IRequestHandler<GetLanguagesQuery, IEnumerable<LanguageDto>>
{
    private readonly ILanguageRepository _languageRepository;

    public GetLanguagesQueryHandler(ILanguageRepository languageRepository)
    {
        _languageRepository = languageRepository;
    }

    public async Task<IEnumerable<LanguageDto>> Handle(GetLanguagesQuery request, CancellationToken cancellationToken)
    {
        var languages = await _languageRepository.GetLanguagesAsync(cancellationToken);

        return languages.Select(l => new LanguageDto
        {
            Code = l.Code.ToString(),
            Name = l.Name,
            Culture = l.Culture
        });
    }
}
