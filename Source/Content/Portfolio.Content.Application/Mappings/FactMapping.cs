using Portfolio.Content.Contracts.Models;

namespace Portfolio.Content.Application.Mappings;

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
                Icon = fact.Icon,
            };
        }
    }
}
