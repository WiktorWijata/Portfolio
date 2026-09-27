namespace Portfolio.Profile.Contracts.Models
{
    public class ProjectDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Goal { get; set; }
        public string Solution { get; set; }
        public string CodeUrl { get; set; }
        public TechnologyDto[] Technologies { get; set; }
    }
}
