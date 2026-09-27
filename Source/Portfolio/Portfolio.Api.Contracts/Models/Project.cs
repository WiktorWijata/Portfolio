namespace RescuePC.Portfolio.Api.Contracts.Models
{
    public class Project
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Goal { get; set; }
        public string Solution { get; set; }
        public string CodeUrl { get; set; }
        public Technology[] Technologies { get; set; }
    }
}
