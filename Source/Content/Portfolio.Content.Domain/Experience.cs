namespace Portfolio.Content.Domain;

public class Experience
{
    public Guid Id { get; set; }
    public Guid ContentId { get; set; }
    public required string Company { get; set; }
    public required string Position { get; set; }
    public required DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Description { get; set; }
    public ICollection<ExperienceAchievement>? Achievements { get; set; }
    public ICollection<ExperienceTechnology>? Technologies { get; set; }
}
