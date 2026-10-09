using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class ExperienceMapping
{
    extension(Experience experience)
    {
        public ExperienceDto ToDto(string employer, ExperienceTranslation translation, ExperienceAreaDto[] areas, TechnologyDto[] technologies)
        {
            return new ExperienceDto
            {
                Employer = employer,
                Position = translation.Position,
                StartDate = experience.StartDate.ToDateTime(TimeOnly.MinValue),
                EndDate = experience.EndDate?.ToDateTime(TimeOnly.MinValue),
                Areas = areas,
                Technologies = technologies
            };
        }
    }

    extension(ExperienceAreaTranslation translation)
    {
        public ExperienceAreaDto ToDto(string[] responsibilities)
        {
            return new ExperienceAreaDto
            {
                Title = translation.Title,
                Responsibilities = responsibilities
            };
        }
    }
}
