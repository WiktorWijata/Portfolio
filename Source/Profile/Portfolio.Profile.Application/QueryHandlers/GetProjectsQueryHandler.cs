using Portfolio.Profile.Application.Mappings;
using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;
using RescuePC.Portfolio.BuildingBlocks.Application;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetProjectsQueryHandler : IRequestHandler<GetProjectsQuery, IEnumerable<ProjectDto>>
{
    private readonly IProjectRepository _projectRepository;
    private readonly ITechnologyRepository _technologyRepository;
    private readonly ICurrentTenant _currentTenant;
    private readonly ICallerContext _callerContext;

    public GetProjectsQueryHandler(
        IProjectRepository projectRepository,
        ITechnologyRepository technologyRepository,
        ICurrentTenant currentTenant,
        ICallerContext callerContext)
    {
        _projectRepository = projectRepository;
        _technologyRepository = technologyRepository;
        _currentTenant = currentTenant;
        _callerContext = callerContext;
    }

    public async Task<IEnumerable<ProjectDto>> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
    {
        var profileId = await _currentTenant.GetProfileIdAsync(cancellationToken);
        var projects = (await _projectRepository.GetAllAsync(profileId, cancellationToken)).ToArray();
        var technologies = await _technologyRepository.GetByIdsAsync(projects.SelectMany(p => p.Technologies.Select(t => t.TechnologyId)), cancellationToken);
        var languageCode = _callerContext.GetLanguageCode();

        return projects
            .SelectTranslated(p => p.GetTranslation(languageCode))
            .Select(x =>
            {
                var technologyDtos = x.Entity.Technologies
                    .OrderBy(t => t.Order)
                    .Select(t => technologies[t.TechnologyId].ToDto())
                    .ToArray();

                return x.Entity.ToDto(x.Translation, technologyDtos);
            })
            .ToArray();
    }
}
