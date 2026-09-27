namespace Portfolio.Profile.Domain;

public class IntroductionTranslation
{
    public Guid IntroductionId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Title { get; set; }
    public required string Motto { get; set; }
    public required string Description { get; set; }
}
