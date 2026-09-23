namespace Portfolio.Profile.Domain;

public class Education
{
    public Guid Id { get; set; }
    public Guid ProfileId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public required string Institution { get; set; }
    public required string Degree { get; set; }
    public string? Field { get; set; }
}