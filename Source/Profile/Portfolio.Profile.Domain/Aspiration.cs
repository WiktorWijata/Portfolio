using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Aspiration : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid ProfileId { get; set; }
    public int Order { get; set; }
    public List<AspirationTranslation> Translations { get; set; } = [];

    protected Aspiration()
    {
    }
}
