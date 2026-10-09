namespace Portfolio.Profile.Domain;

public class Language
{
    public LanguageCode Code { get; set; }
    public required string Name { get; set; }
    public required string Culture { get; set; }
}
