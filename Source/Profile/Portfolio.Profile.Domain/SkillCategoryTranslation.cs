using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class SkillCategoryTranslation : ITranslation<LanguageCode>
{
    public Guid SkillCategoryId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Name { get; set; }
}
