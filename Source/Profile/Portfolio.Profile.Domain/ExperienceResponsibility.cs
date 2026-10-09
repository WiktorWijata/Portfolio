using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ExperienceResponsibility
{
    public Guid Id { get; set; }
    public Guid ExperienceAreaId { get; set; }
    public int Order { get; set; }
    public List<ExperienceResponsibilityTranslation> Translations { get; set; } = [];

    public ExperienceResponsibilityTranslation? GetTranslation(LanguageCode languageCode)
    {
        return Translations.ForLanguage(languageCode, LanguageCode.PL);
    }
}
