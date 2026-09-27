using RescuePC.Portfolio.BuildingBlocks.Domain;
using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Project : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid ProfileId { get; set; }
    public required string Name { get; set; }
    public string? CodeUrl { get; set; }
    public int Order { get; set; }
    public List<ProjectTranslation> Translations { get; set; } = [];
    public List<ProjectTechnology> Technologies { get; set; } = [];

    protected Project()
    {
    }

    public ProjectTranslation? GetTranslation(LanguageCode languageCode)
    {
        return Translations.ForLanguage(languageCode, LanguageCode.PL);
    }
}
