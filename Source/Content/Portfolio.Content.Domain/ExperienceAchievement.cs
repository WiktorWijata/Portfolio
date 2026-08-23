namespace Portfolio.Content.Domain;

public class ExperienceAchievement
{
    public Guid Id { get; set; }
    public Guid ExperienceId { get; set; }
    public required string Description { get; set; }
}
