using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class AspirationRepository : IAspirationRepository
{
    private readonly ProfileDbContext _context;

    public AspirationRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Aspiration>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default)
    {
        return await _context.Set<Aspiration>()
            .Where(a => a.ProfileId == profileId)
            .OrderBy(a => a.Order)
            .ToArrayAsync(cancellationToken);
    }
}
