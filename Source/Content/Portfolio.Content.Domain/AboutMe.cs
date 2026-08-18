namespace Portfolio.Content.Domain;

public class AboutMe
{
    public Guid Id { get; set; }
    public Guid HeroId { get; set; }
    public required string Title { get; set; }
    public string? Header { get; set; }
    public required string[] Description { get; set; }
}
