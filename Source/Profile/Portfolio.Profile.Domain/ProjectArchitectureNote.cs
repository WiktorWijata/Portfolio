using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ProjectArchitectureNote
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public int Order { get; set; }
    public List<ProjectArchitectureNoteTranslation> Translations { get; set; } = [];

    public ProjectArchitectureNoteTranslation? GetTranslation(LanguageCode languageCode)
    {
        return Translations.ForLanguage(languageCode, LanguageCode.PL);
    }
}
