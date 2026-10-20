using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Contact : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid ProfileId { get; set; }
    public required ContactType Type { get; set; }
    public required string Value { get; set; }

    protected Contact()
    {
    }
}
