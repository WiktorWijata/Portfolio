using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class SkillCategoryMapping
{
    extension(SkillCategoryTranslation translation)
    {
        public SkillCategoryDto ToDto(TechnologyDto[] technologies)
        {
            return new SkillCategoryDto
            {
                Name = translation.Name,
                Technologies = technologies
            };
        }
    }
}
