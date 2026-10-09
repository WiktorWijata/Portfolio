using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class AspirationMapping
{
    extension(AspirationTranslation translation)
    {
        public AspirationDto ToDto()
        {
            return new AspirationDto
            {
                Text = translation.Text
            };
        }
    }
}
