using Portfolio.Profile.Contracts.Models;

namespace Portfolio.Profile.Application.Mappings;

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
