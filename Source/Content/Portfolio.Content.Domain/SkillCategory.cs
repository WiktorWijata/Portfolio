namespace Portfolio.Content.Domain;

public class SkillCategory
{
    public Guid Id { get; set; }
    public required string PL { get; set; }
    public required string EN { get; set; }
    public int Order { get; set; }
}
