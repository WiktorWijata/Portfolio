using System;

namespace RescuePC.Portfolio.Api.Contracts.Models
{
    public class Certificate
    {
        public string Name { get; set; }
        public string Issuer { get; set; }
        public DateTime IssuedOn { get; set; }
        public string Code { get; set; }
    }
}
