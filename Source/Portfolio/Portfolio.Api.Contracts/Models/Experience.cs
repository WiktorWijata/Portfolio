using System;

namespace RescuePC.Portfolio.Api.Contracts.Models
{
    public class Experience
    {
        public string Company { get; set; }
        public string Position { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
        public string[] Achivements { get; set; }
        public string[] Technologies { get; set; }
    }
}
