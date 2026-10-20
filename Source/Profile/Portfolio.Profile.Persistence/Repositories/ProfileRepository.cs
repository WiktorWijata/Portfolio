using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class ProfileRepository : IProfileRepository
{
    private readonly ProfileDbContext _context;

    public ProfileRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public Task<Guid> GetProfileIdAsync(CancellationToken cancellationToken = default)
    {
        return _context.Profiles.Select(p => p.Id).SingleAsync(cancellationToken);
    }
}
