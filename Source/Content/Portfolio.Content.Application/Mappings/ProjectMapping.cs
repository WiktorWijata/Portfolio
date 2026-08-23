using Portfolio.Content.Contracts.Models;

namespace Portfolio.Content.Application.Mappings;

public static class ProjectMapping
{
    extension(Domain.Project project)
    {
        public ProjectDto ToDto()
        {
            return new ProjectDto
            {
                Title = project.Title,
                Description = project.Description,
                ImageUrl = project.ImageUrl,
                CodeUrl = project.CodeUrl,
                DemoUrl = project.DemoUrl,
                Technologies = project.Technologies?.Select(t => t.Technology.Name).ToArray(),
            };
        }
    }
}
