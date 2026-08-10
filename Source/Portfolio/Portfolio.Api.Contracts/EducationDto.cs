using System;

namespace RescuePC.Portfolio.Api.Contracts
{
    public class EducationDto
    {
        public string Degree { get; set; }
        public string Field { get; set; }
        public string Institution { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
    }
}
