using Portfolio.Profile.Application.Mappings;
using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;
using RescuePC.Portfolio.BuildingBlocks.Application;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetAspirationsQueryHandler : IRequestHandler<GetAspirationsQuery, IEnumerable<AspirationDto>>
{
    private readonly IAspirationRepository _aspirationRepository;
    private readonly ICurrentTenant _currentTenant;
    private readonly ICallerContext _callerContext;

    public GetAspirationsQueryHandler(IAspirationRepository aspirationRepository, ICurrentTenant currentTenant, ICallerContext callerContext)
    {
        _aspirationRepository = aspirationRepository;
        _currentTenant = currentTenant;
        _callerContext = callerContext;
    }

    public async Task<IEnumerable<AspirationDto>> Handle(GetAspirationsQuery request, CancellationToken cancellationToken)
    {
        var profileId = await _currentTenant.GetProfileIdAsync(cancellationToken);
        var aspirations = await _aspirationRepository.GetAllAsync(profileId, cancellationToken);
        var languageCode = _callerContext.GetLanguageCode();

        return aspirations
            .SelectTranslated(a => a.GetTranslation(languageCode))
            .Select(x => x.Translation.ToDto())
            .ToArray();
    }
}
