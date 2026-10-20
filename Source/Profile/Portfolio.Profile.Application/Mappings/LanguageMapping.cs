using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class LanguageMapping
{
    extension(Language language)
    {
        public LanguageDto ToDto()
        {
            return new LanguageDto
            {
                Code = language.Code.ToString(),
                Name = language.Name,
                Culture = language.Culture,
            };
        }
    }
}
