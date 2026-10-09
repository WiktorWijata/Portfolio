using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Certificate : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid ProfileId { get; set; }
    public required string Name { get; set; }
    public required string Issuer { get; set; }
    public DateOnly IssuedOn { get; set; }
    public string? Code { get; set; }

    protected Certificate()
    {
    }
}
