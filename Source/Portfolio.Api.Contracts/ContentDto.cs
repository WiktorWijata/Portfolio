using System.Collections.Generic;

namespace RescuePC.Portfolio.Api.Contracts
{
    public class ContentDto
    {
        public HeroDto Hero { get; set; }
        public IEnumerable<SkillCategoryDto> SkillsCategories { get; set; }
        public IEnumerable<ProjectDto> Projects { get; set; }
        public IEnumerable<ExperienceDto> Experiences { get; set; }
        public IEnumerable<EducationDto> Educations { get; set; }
        public IEnumerable<FactDto> Facts { get; set; }
        public IEnumerable<ContactDto> Contact { get; set; }
    }
}
