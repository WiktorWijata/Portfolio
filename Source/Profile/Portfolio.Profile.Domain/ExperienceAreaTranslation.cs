namespace Portfolio.Profile.Domain;

public class ExperienceAreaTranslation
{
    public Guid ExperienceAreaId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Title { get; set; }
}
