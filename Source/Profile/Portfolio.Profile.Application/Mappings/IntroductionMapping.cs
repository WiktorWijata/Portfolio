using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class IntroductionMapping
{
    extension(Introduction introduction)
    {
        public IntroductionDto ToDto(IntroductionTranslation translation)
        {
            return new IntroductionDto
            {
                Title = translation.Title,
                Motto = translation.Motto,
                Description = translation.Description
            };
        }
    }
}
