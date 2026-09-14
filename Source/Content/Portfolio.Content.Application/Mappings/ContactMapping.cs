using Portfolio.Content.Contracts.Models;

namespace Portfolio.Content.Application.Mappings;

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
