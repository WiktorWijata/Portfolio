using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class ExperienceRepository : IExperienceRepository
{
    private readonly ProfileDbContext _context;

    public ExperienceRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Experience>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default)
    {
        return await _context.Set<Experience>()
            .Where(e => e.ProfileId == profileId)
            .OrderByDescending(e => e.StartDate)
            .ToArrayAsync(cancellationToken);
    }
}
