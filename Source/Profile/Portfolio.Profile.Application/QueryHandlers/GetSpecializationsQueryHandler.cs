using Portfolio.Profile.Application.Mappings;
using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;
using RescuePC.Portfolio.BuildingBlocks.Application;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetSpecializationsQueryHandler : IRequestHandler<GetSpecializationsQuery, IEnumerable<SpecializationDto>>
{
    private readonly ISpecializationRepository _specializationRepository;
    private readonly ITechnologyRepository _technologyRepository;
    private readonly ICurrentTenant _currentTenant;
    private readonly ICallerContext _callerContext;

    public GetSpecializationsQueryHandler(
        ISpecializationRepository specializationRepository,
        ITechnologyRepository technologyRepository,
        ICurrentTenant currentTenant,
        ICallerContext callerContext)
    {
        _specializationRepository = specializationRepository;
        _technologyRepository = technologyRepository;
        _currentTenant = currentTenant;
        _callerContext = callerContext;
    }

    public async Task<IEnumerable<SpecializationDto>> Handle(GetSpecializationsQuery request, CancellationToken cancellationToken)
    {
        var profileId = await _currentTenant.GetProfileIdAsync(cancellationToken);
        var specializations = (await _specializationRepository.GetAllAsync(profileId, cancellationToken)).ToArray();
        var technologies = await _technologyRepository.GetByIdsAsync(specializations.SelectMany(s => s.Technologies.Select(t => t.TechnologyId)), cancellationToken);
        var languageCode = _callerContext.GetLanguageCode();

        return specializations
            .SelectTranslated(s => s.GetTranslation(languageCode))
            .Select(x =>
            {
                var technologyDtos = x.Entity.Technologies
                    .OrderBy(t => t.Order)
                    .Select(t => technologies[t.TechnologyId].ToDto())
                    .ToArray();

                return x.Translation.ToDto(technologyDtos);
            })
            .ToArray();
    }
}
