using RescuePC.Portfolio.BuildingBlocks.Domain;
using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Introduction : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid ProfileId { get; set; }
    public List<IntroductionTranslation> Translations { get; set; } = [];

    protected Introduction()
    {
    }

    public IntroductionTranslation? GetTranslation(LanguageCode languageCode)
    {
        return Translations.ForLanguage(languageCode, LanguageCode.PL);
    }
}
