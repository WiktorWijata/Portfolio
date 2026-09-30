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
        public ProjectArchitectureNote[] ArchitectureNotes { get; set; }
        public ProjectArchitectureBlock[] ArchitectureBlocks { get; set; }
        public string ArchitectureCaption { get; set; }
        public string ArchitectureDiagramLabel { get; set; }
    }
}
