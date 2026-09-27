namespace Portfolio.Profile.Domain;

public class SkillCategoryTranslation
{
    public Guid SkillCategoryId { get; set; }
    public LanguageCode LanguageCode { get; set; }
    public required string Name { get; set; }
}
