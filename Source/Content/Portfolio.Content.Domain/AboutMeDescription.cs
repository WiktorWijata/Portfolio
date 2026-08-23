namespace Portfolio.Content.Domain;

public class AboutMeDescription
{
    public Guid Id { get; set; }
    public Guid AboutMeId { get; set; }
    public required string Description { get; set; }
    public int? Order { get; set; }
}
