using Portfolio.Content.Application.Queries;
using Portfolio.Content.Contracts.Models;
using Portfolio.Content.Domain.Repositories;
using MediatR;

namespace Portfolio.Content.Application.QueryHandlers;

public class GetContentByLanguageCodeQueryHandler : IRequestHandler<GetContentByLanguageCodeQuery, ContentDto>
{
    private readonly IContentRepository _contentRepository;

    public GetContentByLanguageCodeQueryHandler(IContentRepository contentRepository)
    {
        _contentRepository = contentRepository;
    }

    public async Task<ContentDto> Handle(GetContentByLanguageCodeQuery request, CancellationToken cancellationToken)
    {
        var content = await _contentRepository.GetContentByLanguageCodeAsync(request.LanguageCode, cancellationToken);
        return new ContentDto
        {
            Language = new LanguageDto
            {
                Code = content.Language.Code.ToString(),
                Name = content.Language.Name,
                Culture = content.Language.Culture,
            },
            Hero = new HeroDto
            {
                Motto = content.Hero.Motto,
                AboutMe = new AboutMeDto
                {
                    Title = content.Hero.AboutMe?.Title,
                    Description = content.Hero.AboutMe?.Description.Select(d => d.Description).ToArray(),
                },
            }
        };
    }
}
