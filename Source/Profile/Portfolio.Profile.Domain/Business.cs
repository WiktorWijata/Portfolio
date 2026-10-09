using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Business : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid ProfileId { get; set; }
    public required string Name { get; set; }
    public string? TaxNumber { get; set; }
    public string? RegistrationNumber { get; set; }
    public required string Street { get; set; }
    public required string PostalCode { get; set; }
    public required string City { get; set; }
    public string? Region { get; set; }

    protected Business()
    {
    }
}
