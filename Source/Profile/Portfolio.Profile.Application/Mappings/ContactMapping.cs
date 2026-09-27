using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Application.Mappings;

public static class ContactMapping
{
    extension(Contact contact)
    {
        public ContactDto ToDto()
        {
            return new ContactDto
            {
                Type = contact.Type.ToString(),
                Value = contact.Value
            };
        }
    }
}
