using System;

namespace Portfolio.Profile.Contracts.Models
{
    public class CertificateDto
    {
        public string Name { get; set; }
        public string Issuer { get; set; }
        public DateTime IssuedOn { get; set; }
        public string Code { get; set; }
    }
}
