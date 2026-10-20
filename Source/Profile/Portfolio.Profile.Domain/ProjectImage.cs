using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ProjectImage
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public int Order { get; set; }
    public required string Url { get; set; }
    public List<ProjectImageTranslation> Translations { get; set; } = [];

    public ProjectImageTranslation? GetTranslation(LanguageCode languageCode)
    {
        return Translations.ForLanguage(languageCode, LanguageCode.PL);
    }
}
