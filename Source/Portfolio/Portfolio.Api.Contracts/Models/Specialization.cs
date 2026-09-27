namespace RescuePC.Portfolio.Api.Contracts.Models
{
    public class Specialization
    {
        public string Tag { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public Technology[] Technologies { get; set; }
    }
}
