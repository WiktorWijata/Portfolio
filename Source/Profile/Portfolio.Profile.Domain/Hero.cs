namespace Portfolio.Profile.Domain;

public class Hero
{
    public Guid Id { get; set; }
    public Guid ProfileId { get; set; }
    public string? Motto { get; set; }
    public string? ImageUrl { get; set; }
    public AboutMe? AboutMe { get; set; }
}
