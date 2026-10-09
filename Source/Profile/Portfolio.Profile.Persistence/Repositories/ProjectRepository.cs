using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly ProfileDbContext _context;

    public ProjectRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Project>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default)
    {
        return await _context.Set<Project>()
            .Where(p => p.ProfileId == profileId)
            .OrderBy(p => p.Order)
            .ToArrayAsync(cancellationToken);
    }
}
