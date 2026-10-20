using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class ServiceMapping
{
    extension(Service service)
    {
        public ServiceDto ToDto(ServiceTranslation translation)
        {
            return new ServiceDto
            {
                IconSlug = service.IconSlug,
                Title = translation.Title,
                Description = translation.Description
            };
        }
    }
}
