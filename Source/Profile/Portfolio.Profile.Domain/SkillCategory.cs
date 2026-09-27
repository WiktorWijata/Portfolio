using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class SkillCategory : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public int Order { get; set; }
    public List<SkillCategoryTranslation> Translations { get; set; } = [];

    protected SkillCategory()
    {
    }
}
