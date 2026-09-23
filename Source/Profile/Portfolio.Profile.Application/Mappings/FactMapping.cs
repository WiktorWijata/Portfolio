using Portfolio.Profile.Contracts.Models;

namespace Portfolio.Profile.Application.Mappings;

public static class FactMapping
{
    extension(Domain.Fact fact)
    {
        public FactDto ToDto()
        {
            return new FactDto
            {
                Title = fact.Title,
                Description = fact.Description,
                ImageUrl = fact.ImageUrl,
            };
        }
    }
}
