using Portfolio.Profile.Application.Mappings;
using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain.Repositories;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetProfileByLanguageCodeQueryHandler : IRequestHandler<GetProfileByLanguageCodeQuery, ProfileDto>
{
    private readonly IProfileRepository _contentRepository;

    public GetProfileByLanguageCodeQueryHandler(IProfileRepository contentRepository)
    {
        _contentRepository = contentRepository;
    }

    public async Task<ProfileDto> Handle(GetProfileByLanguageCodeQuery request, CancellationToken cancellationToken)
    {
        var content = await _contentRepository.GetProfileByLanguageCodeAsync(request.LanguageCode, cancellationToken);
        return content.ToDto();
    }
}
