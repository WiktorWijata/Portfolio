using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class BusinessMapping
{
    extension(Business business)
    {
        public BusinessDto ToDto()
        {
            return new BusinessDto
            {
                Name = business.Name,
                TaxNumber = business.TaxNumber,
                RegistrationNumber = business.RegistrationNumber,
                Street = business.Street,
                PostalCode = business.PostalCode,
                City = business.City,
                Region = business.Region
            };
        }
    }
}
