using Portfolio.Content.Contracts.Models;
using Portfolio.Content.Domain;

namespace Portfolio.Content.Application.Mappings;

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
