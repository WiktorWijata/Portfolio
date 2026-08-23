using Portfolio.Content.Contracts.Models;
namespace Portfolio.Content.Application.Mappings;

public static class SkillMapping
{
    extension(Domain.Skill skill)
    {
        public SkillDto ToDto()
        {
            return new SkillDto
            {
                Name = skill.Name,
                ImageUrl = skill.ImageUrl,
            };
        }
    }

    extension(IEnumerable<Domain.Skill> skills)
    {
        public SkillCategoryDto[] ToSkillCategoryDtos(Domain.LanguageCode languageCode)
        {
            return skills
                .GroupBy(s => s.Category)
                .OrderBy(g => g.Key.Order)
                .Select(g => new SkillCategoryDto
                {
                    Name = languageCode == Domain.LanguageCode.PL ? g.Key.PL : g.Key.EN,
                    Skills = g.OrderBy(s => s.Order)
                        .Select(s => s.ToDto())
                        .ToArray(),
                }).ToArray();
        }
    }
}
