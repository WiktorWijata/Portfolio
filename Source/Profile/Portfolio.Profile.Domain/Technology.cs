using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Technology : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public required string Name { get; set; }
    public IconSource? IconSource { get; set; }
    public string? IconSlug { get; set; }
    public bool? IconIsMonochrome { get; set; }

    protected Technology()
    {
    }
}
