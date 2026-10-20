namespace Portfolio.Profile.Contracts.Models
{
    public class SpecializationDto
    {
        public string Tag { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public TechnologyDto[] Technologies { get; set; }
    }
}
