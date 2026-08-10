using System;

namespace RescuePC.Portfolio.Api.Contracts
{
    public class ExperienceDto
    {
        public string Position { get; set; }
        public string Company { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
        public string[] Achivements { get; set; }
        public string[] Technologies { get; set; }
    }
}
