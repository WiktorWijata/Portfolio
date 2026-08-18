namespace Portfolio.Content.Domain;

public class Fact
{
    public Guid Id { get; set; }
    public Guid ContentId { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public string? Icon { get; set; }
}
