using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ExperienceResponsibilityTranslation : ITranslation<LanguageCode>
{
    public Guid ExperienceResponsibilityId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Description { get; set; }
}
