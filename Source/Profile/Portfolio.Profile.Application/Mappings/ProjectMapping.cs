using Portfolio.Profile.Contracts.Models;

namespace Portfolio.Profile.Application.Mappings;

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
