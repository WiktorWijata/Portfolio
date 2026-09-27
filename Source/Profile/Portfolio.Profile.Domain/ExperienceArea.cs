using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ExperienceArea
{
    public Guid Id { get; set; }
    public Guid ExperienceId { get; set; }
    public int Order { get; set; }
    public List<ExperienceAreaTranslation> Translations { get; set; } = [];
    public List<ExperienceResponsibility> Responsibilities { get; set; } = [];

    public ExperienceAreaTranslation? GetTranslation(LanguageCode languageCode)
    {
        return Translations.ForLanguage(languageCode, LanguageCode.PL);
    }
}
