using Portfolio.Content.Contracts.Models;

namespace Portfolio.Content.Application.Mappings;

public static class HeroMapping
{
    extension(Domain.Hero hero)
    {
        public HeroDto ToDto()
        {
            return new HeroDto
            {
                Motto = hero.Motto,
                AboutMe = hero.AboutMe?.ToDto()
            };
        }
    }
}
