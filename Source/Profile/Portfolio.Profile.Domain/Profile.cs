using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Profile : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid UserId { get; set; }
    public required string Name { get; set; }

    protected Profile()
    {
    }
}
