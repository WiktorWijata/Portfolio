using System;

namespace Portfolio.Profile.Contracts.Models
{
    public class ProfileDto
    {
        public Guid Id { get; set; }
        public LanguageDto Language { get; set; }
        public HeroDto Hero { get; set; }
        public SkillCategoryDto[] SkillsCategories { get; set; }
        public ProjectDto[] Projects { get; set; }
        public ExperienceDto[] Experiences { get; set; }
        public EducationDto[] Educations { get; set; }
        public FactDto[] Facts { get; set; }
        public ContactDto[] Contacts { get; set; }
    }
}
