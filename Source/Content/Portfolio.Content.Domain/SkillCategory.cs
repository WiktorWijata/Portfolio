namespace Portfolio.Content.Domain;

public class SkillCategory
{
    public Guid Id { get; set; }
    public required string NamePl { get; set; }
    public required string NameEn { get; set; }
    public int Order { get; set; }
}
