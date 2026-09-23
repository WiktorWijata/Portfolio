using Portfolio.Profile.Contracts.Models;

namespace Portfolio.Profile.Application.Mappings;

public static class ProfileMapping
{
    extension(Domain.Profile content)
    {
        public ProfileDto ToDto()
        {
            return new ProfileDto
            {
                Id = content.Id,
                Language = content.Language.ToDto(),
                Hero = content.Hero.ToDto(),
                SkillsCategories = content.Skills?.ToSkillCategoryDtos(content.Language.Code),
                Projects = content.Projects?.Select(p => p.ToDto()).ToArray(),
                Experiences = content.Experiences?.Select(e => e.ToDto()).ToArray(),
                Educations = content.Educations?.Select(e => e.ToDto()).ToArray(),
                Facts = content.Facts?.Select(f => f.ToDto()).ToArray(),
                Contacts = content.Contacts?.Select(c => c.ToDto()).ToArray()
            };

        }
    }
}
