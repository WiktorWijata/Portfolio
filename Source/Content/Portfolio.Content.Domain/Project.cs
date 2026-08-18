namespace Portfolio.Content.Domain;

public class Project
{
    public Guid Id { get; set; }
    public Guid ContentId { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public string? ImageUrl { get; set; }       
    public string? CodeUrl { get; set; }
    public string? DemoUrl { get; set; }
    public required ICollection<Technology> Technologies { get; set; }
}
