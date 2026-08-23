using Portfolio.Content.Contracts.Models;

namespace Portfolio.Content.Application.Mappings;

public static class ExperienceMapping
{
    extension(Domain.Experience experience)
    {
        public ExperienceDto ToDto()
        {
            return new ExperienceDto
            {
                Company = experience.Company,
                Position = experience.Position,
                StartDate = experience.StartDate,
                EndDate = experience.EndDate,
                Description = experience.Description,
                Technologies = experience.Technologies?.Select(t => t.Name).ToArray(),
                Achievements = experience.Achievements?.Select(a => a.Description).ToArray(),
            };
        }
    }
}
