namespace Portfolio.Profile.Domain;

public class Contact
{
    public Guid Id { get; set; }
    public Guid ProfileId { get; set; }
    public required ContactType Type { get; set; }
    public required string Value { get; set; }
    public required bool IsExternal { get; set; }
}
