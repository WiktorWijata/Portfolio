namespace Portfolio.Profile.Domain;

public class AspirationTranslation
{
    public Guid AspirationId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Text { get; set; }
}
