using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ExperienceTranslation : ITranslation<LanguageCode>
{
    public Guid ExperienceId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Position { get; set; }
}
