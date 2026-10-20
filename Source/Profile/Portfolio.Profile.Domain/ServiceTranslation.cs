using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ServiceTranslation : ITranslation<LanguageCode>
{
    public Guid ServiceId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
}
