namespace RescuePC.Portfolio.Api.Contracts.Models
{
    public class ProjectArchitectureBlock
    {
        public string Title { get; set; }
        public string Note { get; set; }
        public string Url { get; set; }
        public string LinkLabel { get; set; }
        public string ConnectionLabel { get; set; }
        public ProjectArchitectureBlock[] Children { get; set; }
    }
}
