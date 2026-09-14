using Portfolio.Content.Contracts.Models;

namespace Portfolio.Content.Application.Mappings;

public static class ContentMapping
{
    extension(Domain.Content content)
    {
        public ContentDto ToDto()
        {
            return new ContentDto
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
