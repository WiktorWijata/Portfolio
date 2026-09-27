using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class SpecializationTranslation : ITranslation<LanguageCode>
{
    public Guid SpecializationId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Tag { get; set; }
    public required string Title { get; set; }
    public required string Subtitle { get; set; }
}
