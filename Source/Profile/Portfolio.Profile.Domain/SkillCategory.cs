using RescuePC.Portfolio.BuildingBlocks.Domain;
using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class SkillCategory : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public int Order { get; set; }
    public List<SkillCategoryTranslation> Translations { get; set; } = [];

    protected SkillCategory()
    {
    }

    public SkillCategoryTranslation? GetTranslation(LanguageCode languageCode)
    {
        return Translations.ForLanguage(languageCode, LanguageCode.PL);
    }
}
