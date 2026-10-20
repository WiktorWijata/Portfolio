using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ProjectArchitectureBlock
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public Guid? ParentBlockId { get; set; }
    public int Order { get; set; }
    /// <summary>Path relative to the project's CodeUrl (e.g. a folder in the repository).</summary>
    public string? Path { get; set; }
    public List<ProjectArchitectureBlockTranslation> Translations { get; set; } = [];

    public ProjectArchitectureBlockTranslation? GetTranslation(LanguageCode languageCode)
    {
        return Translations.ForLanguage(languageCode, LanguageCode.PL);
    }
}
