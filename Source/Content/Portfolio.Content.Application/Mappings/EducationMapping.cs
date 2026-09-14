using Portfolio.Content.Contracts.Models;

namespace Portfolio.Content.Application.Mappings;

public static class EducationMapping
{
    extension(Domain.Education education)
    {
        public EducationDto ToDto()
        {
            return new EducationDto
            {
                StartDate = education.StartDate,
                EndDate = education.EndDate,
                Institution = education.Institution,
                Degree = education.Degree,
                Field = education.Field,
            };
        }
    }
}
