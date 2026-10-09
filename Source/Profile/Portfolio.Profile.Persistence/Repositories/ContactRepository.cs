using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class ContactRepository : IContactRepository
{
    private readonly ProfileDbContext _context;

    public ContactRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Contact>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default)
    {
        return await _context.Set<Contact>()
            .Where(c => c.ProfileId == profileId)
            .OrderBy(c => c.Type)
            .ToArrayAsync(cancellationToken);
    }
}
