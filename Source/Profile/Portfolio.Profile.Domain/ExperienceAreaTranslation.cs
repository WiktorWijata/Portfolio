using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ExperienceAreaTranslation : ITranslation<LanguageCode>
{
    public Guid ExperienceAreaId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Title { get; set; }
}
