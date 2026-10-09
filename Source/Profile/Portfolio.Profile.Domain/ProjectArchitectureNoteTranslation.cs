using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ProjectArchitectureNoteTranslation : ITranslation<LanguageCode>
{
    public Guid ProjectArchitectureNoteId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Title { get; set; }
    public required string Text { get; set; }
}
