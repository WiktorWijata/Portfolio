using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class CertificateMapping
{
    extension(Certificate certificate)
    {
        public CertificateDto ToDto()
        {
            return new CertificateDto
            {
                Name = certificate.Name,
                Issuer = certificate.Issuer,
                IssuedOn = certificate.IssuedOn.ToDateTime(TimeOnly.MinValue),
                Code = certificate.Code
            };
        }
    }
}
