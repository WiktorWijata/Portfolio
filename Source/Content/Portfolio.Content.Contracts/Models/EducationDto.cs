using System;

namespace Portfolio.Content.Contracts.Models
{
    public class EducationDto
    {
        public string Institution { get; set; }
        public string Degree { get; set; }
        public string Field { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
