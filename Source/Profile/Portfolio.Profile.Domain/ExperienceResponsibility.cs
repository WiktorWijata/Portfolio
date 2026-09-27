namespace Portfolio.Profile.Domain;

public class ExperienceResponsibility
{
    public Guid Id { get; set; }
    public Guid ExperienceAreaId { get; set; }
    public int Order { get; set; }
    public List<ExperienceResponsibilityTranslation> Translations { get; set; } = [];
}
