namespace Portfolio.Profile.Domain;

public class ExperienceAchievement
{
    public Guid Id { get; set; }
    public Guid ExperienceId { get; set; }
    public required string Description { get; set; }
    public int? Order { get; set; }
}
