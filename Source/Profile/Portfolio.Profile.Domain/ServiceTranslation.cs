namespace Portfolio.Profile.Domain;

public class ServiceTranslation
{
    public Guid ServiceId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
}
