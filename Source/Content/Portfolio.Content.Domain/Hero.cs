namespace Portfolio.Content.Domain;

public class Hero
{
    public Guid Id { get; set; }
    public Guid ContentId { get; set; }
    public string? Motto { get; set; }
    public string? ImageUrl { get; set; }
    public AboutMe? AboutMe { get; set; }
}
