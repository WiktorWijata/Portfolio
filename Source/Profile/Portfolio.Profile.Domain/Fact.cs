namespace Portfolio.Profile.Domain;

public class Fact
{
    public Guid Id { get; set; }
    public Guid ProfileId { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public string? ImageUrl { get; set; }
}
