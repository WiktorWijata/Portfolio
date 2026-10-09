using System;

namespace Portfolio.Profile.Contracts.Models
{
    public class ExperienceDto
    {
        public string Employer { get; set; }
        public string Position { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public ExperienceAreaDto[] Areas { get; set; }
        public TechnologyDto[] Technologies { get; set; }
    }

    public class ExperienceAreaDto
    {
        public string Title { get; set; }
        public string[] Responsibilities { get; set; }
    }
}
