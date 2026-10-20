namespace Portfolio.Profile.Contracts.Models
{
    public class ProjectArchitectureBlockDto
    {
        public string Title { get; set; }
        public string Note { get; set; }
        public string Url { get; set; }
        public string LinkLabel { get; set; }
        public string ConnectionLabel { get; set; }
        public ProjectArchitectureBlockDto[] Children { get; set; }
    }
}
