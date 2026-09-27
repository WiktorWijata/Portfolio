using Portfolio.Profile.Application.Mappings;
using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;
using RescuePC.Portfolio.BuildingBlocks.Application;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetExperiencesQueryHandler : IRequestHandler<GetExperiencesQuery, IEnumerable<ExperienceDto>>
{
    private readonly IExperienceRepository _experienceRepository;
    private readonly IEmployerRepository _employerRepository;
    private readonly ITechnologyRepository _technologyRepository;
    private readonly ICurrentTenant _currentTenant;
    private readonly ICallerContext _callerContext;

    public GetExperiencesQueryHandler(
        IExperienceRepository experienceRepository,
        IEmployerRepository employerRepository,
        ITechnologyRepository technologyRepository,
        ICurrentTenant currentTenant,
        ICallerContext callerContext)
    {
        _experienceRepository = experienceRepository;
        _employerRepository = employerRepository;
        _technologyRepository = technologyRepository;
        _currentTenant = currentTenant;
        _callerContext = callerContext;
    }

    public async Task<IEnumerable<ExperienceDto>> Handle(GetExperiencesQuery request, CancellationToken cancellationToken)
    {
        var profileId = await _currentTenant.GetProfileIdAsync(cancellationToken);
        var experiences = (await _experienceRepository.GetAllAsync(profileId, cancellationToken)).ToArray();
        var employers = await _employerRepository.GetByIdsAsync(experiences.Select(e => e.EmployerId), cancellationToken);
        var technologies = await _technologyRepository.GetByIdsAsync(experiences.SelectMany(e => e.Technologies.Select(t => t.TechnologyId)), cancellationToken);
        var languageCode = _callerContext.GetLanguageCode();

        return experiences
            .SelectTranslated(e => e.GetTranslation(languageCode))
            .Select(x =>
            {
                var areas = MapAreas(x.Entity.Areas, languageCode);
                var technologyDtos = x.Entity.Technologies
                    .OrderBy(t => t.Order)
                    .Select(t => technologies[t.TechnologyId].ToDto())
                    .ToArray();

                return x.Entity.ToDto(employers[x.Entity.EmployerId].Name, x.Translation, areas, technologyDtos);
            })
            .ToArray();
    }

    private static ExperienceAreaDto[] MapAreas(IEnumerable<ExperienceArea> areas, LanguageCode languageCode)
    {
        return areas
            .OrderBy(area => area.Order)
            .SelectTranslated(a => a.GetTranslation(languageCode))
            .Select(x => x.Translation.ToDto(MapResponsibilities(x.Entity.Responsibilities, languageCode)))
            .ToArray();
    }

    private static string[] MapResponsibilities(IEnumerable<ExperienceResponsibility> responsibilities, LanguageCode languageCode)
    {
        return responsibilities
            .OrderBy(r => r.Order)
            .SelectTranslated(r => r.GetTranslation(languageCode))
            .Select(x => x.Translation.Description)
            .ToArray();
    }
}
