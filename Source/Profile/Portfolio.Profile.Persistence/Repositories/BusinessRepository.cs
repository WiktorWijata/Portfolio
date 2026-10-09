using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class BusinessRepository : IBusinessRepository
{
    private readonly ProfileDbContext _context;

    public BusinessRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public Task<Business?> GetAsync(Guid profileId, CancellationToken cancellationToken = default)
    {
        return _context.Set<Business>().SingleOrDefaultAsync(b => b.ProfileId == profileId, cancellationToken);
    }
}
