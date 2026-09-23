namespace Portfolio.Profile.Domain;

public class Skill
{
    public Guid Id { get; set; }
    public Guid ProfileId { get; set; }
    public Guid SkillCategoryId { get; set; }
    public SkillCategory Category { get; set; }
    public required string Name { get; set; }
    public string? ImageUrl { get; set; }
    public int Order { get; set; }
}
