using Portfolio.Content.Contracts;
using Portfolio.Content.Contracts.Models;
using Portfolio.Content.Application.Queries;
using MediatR;

namespace Portfolio.Content.Infrastructure;

public class ContentModule : IContentModule
{
    private readonly IMediator _mediator;

    public ContentModule(IMediator mediator)
    {   
        _mediator = mediator;
    }

    public Task<IEnumerable<LanguageDto>> GetLanguages(CancellationToken cancellationToken = default)
        =>  _mediator.Send(new GetLanguagesQuery(), cancellationToken);

    public Task<ContentDto> GetContentByLanguageCode(string languageCode, CancellationToken cancellationToken = default)
        => _mediator.Send(new GetContentByLanguageCodeQuery(languageCode), cancellationToken);
}
