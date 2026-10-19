using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class ProjectImageMapping
{
    extension(ProjectImage image)
    {
        public ProjectImageDto ToDto(ProjectImageTranslation translation)
        {
            return new ProjectImageDto
            {
                Url = image.Url,
                Alt = translation.Alt
            };
        }
    }
}
