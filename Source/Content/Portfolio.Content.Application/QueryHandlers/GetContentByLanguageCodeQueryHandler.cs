using Portfolio.Content.Application.Mappings;
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
        return content.ToDto();
    }
}
