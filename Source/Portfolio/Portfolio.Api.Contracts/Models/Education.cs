using System;

namespace RescuePC.Portfolio.Api.Contracts.Models
{
    public class Education
    {
        public string Institution { get; set; }
        public string Degree { get; set; }
        public string Field { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
