using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Skill : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public Guid ProfileId { get; set; }
    public Guid TechnologyId { get; set; }
    public Guid SkillCategoryId { get; set; }
    public int Order { get; set; }

    protected Skill()
    {
    }
}
