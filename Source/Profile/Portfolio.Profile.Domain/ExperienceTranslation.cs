namespace Portfolio.Profile.Domain;

public class ExperienceTranslation
{
    public Guid ExperienceId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Position { get; set; }
}
