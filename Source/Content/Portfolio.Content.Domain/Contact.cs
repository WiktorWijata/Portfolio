namespace Portfolio.Content.Domain;

public class Contact
{
    public Guid Id { get; set; }
    public Guid ContentId { get; set; }
    public required ContactType Type { get; set; }
    public required string Value { get; set; }
    public required bool IsExternal { get; set; }
}
