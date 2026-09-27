using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Service : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid ProfileId { get; set; }
    public required string IconSlug { get; set; }
    public int Order { get; set; }
    public List<ServiceTranslation> Translations { get; set; } = [];

    protected Service()
    {
    }
}
