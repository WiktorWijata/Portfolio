using Portfolio.Content.Contracts.Models;

namespace Portfolio.Content.Application.Mappings;

public static class AboutMeMapping
{
    extension(Domain.AboutMe aboutMe)
    {
        public AboutMeDto ToDto()
        {
            return new AboutMeDto
            {
                Title = aboutMe.Title,
                Description = aboutMe.Description.Select(d => d.Description).ToArray(),
            };
        }
    }
}
