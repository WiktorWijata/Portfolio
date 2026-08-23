using RescuePC.Portfolio.Api.Contracts.Models;

namespace RescuePC.Portfolio.Api.Contracts
{
    public class ContentResponse
    {
        public Language Language { get; set; }
        public Hero Hero { get; set; }
        public SkillCategory[] SkillsCategories { get; set; }
        public Project[] Projects { get; set; }
        public Experience[] Experiences { get; set; }
        public Education[] Educations { get; set; }
        public Fact[] Facts { get; set; }
        public Contact[] Contacts { get; set; }
    }
}
