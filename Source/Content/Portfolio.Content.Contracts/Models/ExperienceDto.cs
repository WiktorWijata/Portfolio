using System;

namespace Portfolio.Content.Contracts.Models
{
    public class ExperienceDto
    {
        public string Company { get; set; }
        public string Position { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
        public string[] Achievements { get; set; }
        public string[] Technologies { get; set; }
    }
}
