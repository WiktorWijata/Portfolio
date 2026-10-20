using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class TechnologyMapping
{
    extension(Technology technology)
    {
        public TechnologyDto ToDto()
        {
            return new TechnologyDto
            {
                Name = technology.Name,
                IconSource = technology.IconSource?.ToString(),
                IconSlug = technology.IconSlug,
                IconIsMonochrome = technology.IconIsMonochrome
            };
        }
    }
}
