using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ProjectImageTranslation : ITranslation<LanguageCode>
{
    public Guid ProjectImageId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Alt { get; set; }
}
