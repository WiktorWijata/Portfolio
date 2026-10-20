using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class AspirationTranslation : ITranslation<LanguageCode>
{
    public Guid AspirationId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Text { get; set; }
}
