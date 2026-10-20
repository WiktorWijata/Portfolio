using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class ProjectArchitectureNoteMapping
{
    extension(ProjectArchitectureNoteTranslation translation)
    {
        public ProjectArchitectureNoteDto ToDto()
        {
            return new ProjectArchitectureNoteDto
            {
                Title = translation.Title,
                Text = translation.Text
            };
        }
    }
}
