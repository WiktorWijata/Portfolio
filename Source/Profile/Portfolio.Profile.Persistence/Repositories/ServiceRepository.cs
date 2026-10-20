using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class ServiceRepository : IServiceRepository
{
    private readonly ProfileDbContext _context;

    public ServiceRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Service>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default)
    {
        return await _context.Set<Service>()
            .Where(s => s.ProfileId == profileId)
            .OrderBy(s => s.Order)
            .ToArrayAsync(cancellationToken);
    }
}
