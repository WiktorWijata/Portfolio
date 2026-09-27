namespace Portfolio.Profile.Domain;

public class ExperienceArea
{
    public Guid Id { get; set; }
    public Guid ExperienceId { get; set; }
    public int Order { get; set; }
    public List<ExperienceAreaTranslation> Translations { get; set; } = [];
    public List<ExperienceResponsibility> Responsibilities { get; set; } = [];
}
