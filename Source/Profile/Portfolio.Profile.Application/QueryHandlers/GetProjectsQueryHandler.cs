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

                var architectureNotes = MapArchitectureNotes(x.Entity.ArchitectureNotes, languageCode);
                var architectureBlocks = MapArchitectureBlocks(x.Entity, languageCode);

                return x.Entity.ToDto(x.Translation, technologyDtos, architectureNotes, architectureBlocks);
            })
            .ToArray();
    }

    private static ProjectArchitectureBlockDto[] MapArchitectureBlocks(Project project, LanguageCode languageCode)
    {
        var childrenByParent = project.ArchitectureBlocks
            .Where(block => block.ParentBlockId is not null)
            .ToLookup(block => block.ParentBlockId!.Value);

        return project.ArchitectureBlocks
            .Where(block => block.ParentBlockId is null)
            .OrderBy(block => block.Order)
            .SelectTranslated(block => block.GetTranslation(languageCode))
            .Select(x =>
            {
                var children = childrenByParent[x.Entity.Id]
                    .OrderBy(child => child.Order)
                    .SelectTranslated(child => child.GetTranslation(languageCode))
                    .Select(c => c.Entity.ToDto(c.Translation, project.CodeUrl, []))
                    .ToArray();

                return x.Entity.ToDto(x.Translation, project.CodeUrl, children);
            })
            .ToArray();
    }

    private static ProjectArchitectureNoteDto[] MapArchitectureNotes(IEnumerable<ProjectArchitectureNote> notes, LanguageCode languageCode)
    {
        return notes
            .OrderBy(note => note.Order)
            .SelectTranslated(note => note.GetTranslation(languageCode))
            .Select(x => x.Translation.ToDto())
            .ToArray();
    }
}
