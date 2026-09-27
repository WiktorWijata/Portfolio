using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Introduction : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid ProfileId { get; set; }
    public List<IntroductionTranslation> Translations { get; set; } = [];

    protected Introduction()
    {
    }
}
