using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class SpecializationMapping
{
    extension(SpecializationTranslation translation)
    {
        public SpecializationDto ToDto(TechnologyDto[] technologies)
        {
            return new SpecializationDto
            {
                Tag = translation.Tag,
                Title = translation.Title,
                Subtitle = translation.Subtitle,
                Technologies = technologies
            };
        }
    }
}
