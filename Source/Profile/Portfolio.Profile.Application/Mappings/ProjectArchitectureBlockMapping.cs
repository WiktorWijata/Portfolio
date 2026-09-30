using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class ProjectArchitectureBlockMapping
{
    extension(ProjectArchitectureBlock block)
    {
        public ProjectArchitectureBlockDto ToDto(ProjectArchitectureBlockTranslation translation, string? codeUrl, ProjectArchitectureBlockDto[] children)
        {
            return new ProjectArchitectureBlockDto
            {
                Title = translation.Title,
                Note = translation.Note,
                Url = string.IsNullOrEmpty(block.Path) || string.IsNullOrEmpty(codeUrl) ? null : $"{codeUrl.TrimEnd('/')}/{block.Path.TrimStart('/')}",
                LinkLabel = translation.LinkLabel,
                ConnectionLabel = translation.ConnectionLabel,
                Children = children
            };
        }
    }
}
