using RescuePC.Portfolio.BuildingBlocks.Domain;
using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Specialization : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid ProfileId { get; set; }
    public int Order { get; set; }
    public List<SpecializationTranslation> Translations { get; set; } = [];
    public List<SpecializationTechnology> Technologies { get; set; } = [];

    protected Specialization()
    {
    }

    public SpecializationTranslation? GetTranslation(LanguageCode languageCode)
    {
        return Translations.ForLanguage(languageCode, LanguageCode.PL);
    }
}
