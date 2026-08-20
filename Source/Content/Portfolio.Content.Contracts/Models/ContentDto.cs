using System;

namespace Portfolio.Content.Contracts.Models
{
    public class ContentDto
    {
        public Guid Id { get; set; }
        public LanguageDto Language { get; set; }
        public HeroDto Hero { get; set; }
        public SkillDto[] Skills { get; set; }
        public ProjectDto[] Projects { get; set; }
        public ExperienceDto[] Experiences { get; set; }
        public EducationDto[] Educations { get; set; }
        public FactDto[] Facts { get; set; }
        public ContactDto[] Contacts { get; set; }
    }
}
