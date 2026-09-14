namespace Portfolio.Content.Domain;

public class ExperienceTechnology
{
    public Guid ExperienceId { get; set; }
    public Guid TechnologyId { get; set; }
    public int? Order { get; set; }
    public required Technology Technology { get; set; }
}
