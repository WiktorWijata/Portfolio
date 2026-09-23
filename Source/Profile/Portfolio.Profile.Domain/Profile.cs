using RescuePC.Software.Domain;

namespace Portfolio.Profile.Domain;

public class Profile : AggregateRoot<Guid>
{
    public override Guid Id { get; protected set; }
    public LanguageCode LanguageCode { get; protected set; }
    public required Language Language { get; set; }
    public required Hero Hero { get; set; }
    public ICollection<Skill> Skills { get; protected set; }
    public ICollection<Project> Projects { get; protected set; }
    public ICollection<Experience> Experiences { get; protected set; }
    public ICollection<Education> Educations { get; protected set; }
    public ICollection<Fact> Facts { get; protected set; }
    public ICollection<Contact> Contacts { get; protected set; }

    protected Profile()
    {
        Skills = new HashSet<Skill>();
        Projects = new HashSet<Project>();
        Experiences = new HashSet<Experience>();
        Educations = new HashSet<Education>();
        Facts = new HashSet<Fact>();
        Contacts = new HashSet<Contact>();
    }
}
