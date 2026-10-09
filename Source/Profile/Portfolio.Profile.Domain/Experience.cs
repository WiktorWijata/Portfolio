using RescuePC.Portfolio.BuildingBlocks.Domain;
using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Experience : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid ProfileId { get; set; }
    public Guid EmployerId { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public List<ExperienceTranslation> Translations { get; set; } = [];
    public List<ExperienceArea> Areas { get; set; } = [];
    public List<ExperienceTechnology> Technologies { get; set; } = [];

    protected Experience()
    {
    }

    public ExperienceTranslation? GetTranslation(LanguageCode languageCode)
    {
        return Translations.ForLanguage(languageCode, LanguageCode.PL);
    }
}
