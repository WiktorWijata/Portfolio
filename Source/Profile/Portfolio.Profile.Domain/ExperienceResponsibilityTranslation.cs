namespace Portfolio.Profile.Domain;

public class ExperienceResponsibilityTranslation
{
    public Guid ExperienceResponsibilityId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Description { get; set; }
}
