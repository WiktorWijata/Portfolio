using Portfolio.Profile.Contracts.Models;

namespace Portfolio.Profile.Application.Mappings;

public static class HeroMapping
{
    extension(Domain.Hero hero)
    {
        public HeroDto ToDto()
        {
            return new HeroDto
            {
                Motto = hero.Motto,
                ImageUrl = hero.ImageUrl,
                AboutMe = hero.AboutMe?.ToDto()
            };
        }
    }
}
