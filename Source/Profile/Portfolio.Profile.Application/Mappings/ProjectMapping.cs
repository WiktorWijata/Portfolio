using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class ProjectMapping
{
    extension(Project project)
    {
        public ProjectDto ToDto(ProjectTranslation translation, TechnologyDto[] technologies, ProjectArchitectureNoteDto[] architectureNotes, ProjectArchitectureBlockDto[] architectureBlocks)
        {
            return new ProjectDto
            {
                Name = project.Name,
                Description = translation.Description,
                Goal = translation.Goal,
                Solution = translation.Solution,
                CodeUrl = project.CodeUrl,
                Technologies = technologies,
                ArchitectureNotes = architectureNotes,
                ArchitectureBlocks = architectureBlocks,
                ArchitectureCaption = translation.ArchitectureCaption,
                ArchitectureDiagramLabel = translation.ArchitectureDiagramLabel
            };
        }
    }
}
