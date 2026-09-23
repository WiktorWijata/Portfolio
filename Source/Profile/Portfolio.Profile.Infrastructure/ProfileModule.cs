using Portfolio.Profile.Contracts;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Application.Queries;
using MediatR;

namespace Portfolio.Profile.Infrastructure;

public class ProfileModule : IProfileModule
{
    private readonly IMediator _mediator;

    public ProfileModule(IMediator mediator)
    {   
        _mediator = mediator;
    }

    public Task<IEnumerable<LanguageDto>> GetLanguages(CancellationToken cancellationToken = default)
        =>  _mediator.Send(new GetLanguagesQuery(), cancellationToken);

    public Task<ProfileDto> GetProfileByLanguageCode(string languageCode, CancellationToken cancellationToken = default)
        => _mediator.Send(new GetProfileByLanguageCodeQuery(languageCode), cancellationToken);
}
