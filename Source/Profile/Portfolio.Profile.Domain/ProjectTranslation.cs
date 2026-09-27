namespace Portfolio.Profile.Domain;

public class ProjectTranslation
{
    public Guid ProjectId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Description { get; set; }
    public string? Goal { get; set; }
    public string? Solution { get; set; }
}
