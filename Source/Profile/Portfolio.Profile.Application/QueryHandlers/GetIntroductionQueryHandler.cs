using Portfolio.Profile.Application.Mappings;
using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;
using RescuePC.Portfolio.BuildingBlocks.Application;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetIntroductionQueryHandler : IRequestHandler<GetIntroductionQuery, IntroductionDto>
{
    private readonly IIntroductionRepository _introductionRepository;
    private readonly ICurrentTenant _currentTenant;
    private readonly ICallerContext _callerContext;

    public GetIntroductionQueryHandler(IIntroductionRepository introductionRepository, ICurrentTenant currentTenant, ICallerContext callerContext)
    {
        _introductionRepository = introductionRepository;
        _currentTenant = currentTenant;
        _callerContext = callerContext;
    }

    public async Task<IntroductionDto> Handle(GetIntroductionQuery request, CancellationToken cancellationToken)
    {
        var profileId = await _currentTenant.GetProfileIdAsync(cancellationToken);
        var introduction = await _introductionRepository.GetAsync(profileId, cancellationToken)
            ?? throw new InvalidOperationException($"Profile {profileId} has no Introduction.");

        var translation = introduction.GetTranslation(_callerContext.GetLanguageCode())
            ?? throw new InvalidOperationException($"Introduction {introduction.Id} has no PL translation.");

        return introduction.ToDto(translation);
    }
}
