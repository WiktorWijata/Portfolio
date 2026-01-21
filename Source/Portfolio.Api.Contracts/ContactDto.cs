namespace RescuePC.Portfolio.Api.Contracts
{
    public class ContactDto
    {
        public string Type { get; set; }
        public string Value { get; set; }
        public string Title { get; set; }
        public bool IsExternal { get; set; }
    }
}
