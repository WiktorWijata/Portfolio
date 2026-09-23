using Portfolio.Profile.Contracts.Models;

namespace Portfolio.Profile.Application.Mappings;

public static class ContactMapping
{
    extension(Domain.Contact contact)
    {
        public ContactDto ToDto()
        {
            return new ContactDto
            {
                Type = contact.Type.ToString(),
                Value = contact.Value,
                IsExternal = contact.IsExternal,
            };
        }
    }
}
