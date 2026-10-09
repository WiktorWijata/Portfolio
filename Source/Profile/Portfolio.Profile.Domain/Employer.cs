using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Employer : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public required string Name { get; set; }

    protected Employer()
    {
    }
}
