using System;

namespace RescuePC.Portfolio.Api.Contracts.Models
{
    public class Experience
    {
        public string Employer { get; set; }
        public string Position { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public ExperienceArea[] Areas { get; set; }
        public Technology[] Technologies { get; set; }
    }

    public class ExperienceArea
    {
        public string Title { get; set; }
        public string[] Responsibilities { get; set; }
    }
}
