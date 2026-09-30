using RescuePC.Portfolio.BuildingBlocks.Domain;

namespace Portfolio.Profile.Domain;

public class ProjectArchitectureBlockTranslation : ITranslation<LanguageCode>
{
    public Guid ProjectArchitectureBlockId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Title { get; set; }
    public string? Note { get; set; }
    public string? LinkLabel { get; set; }
    public string? ConnectionLabel { get; set; }
}
