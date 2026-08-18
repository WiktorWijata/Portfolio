using Porfolio.Content.Contracts;
using MediatR;
using Portfolio.Content.Contracts.Models;
using Portfolio.Content.Application.Queries;

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
}
