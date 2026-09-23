using Portfolio.Profile.Contracts.Models;

namespace Portfolio.Profile.Application.Mappings;

public static class AboutMeMapping
{
    extension(Domain.AboutMe aboutMe)
    {
        public AboutMeDto ToDto()
        {
            return new AboutMeDto
            {
                Title = aboutMe.Title,
                Header = aboutMe.Header,
                Description = aboutMe.Description.Select(d => d.Description).ToArray(),
            };
        }
    }
}
