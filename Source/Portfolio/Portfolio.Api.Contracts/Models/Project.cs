namespace RescuePC.Portfolio.Api.Contracts.Models
{
    public class Project
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string CodeUrl { get; set; }
        public string DemoUrl { get; set; }
        public string[] Technologies { get; set; }
    }
}
