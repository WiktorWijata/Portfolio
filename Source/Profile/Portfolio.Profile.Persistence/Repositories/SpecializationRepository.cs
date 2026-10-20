using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class SpecializationRepository : ISpecializationRepository
{
    private readonly ProfileDbContext _context;

    public SpecializationRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Specialization>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default)
    {
        return await _context.Set<Specialization>()
            .Where(s => s.ProfileId == profileId)
            .OrderBy(s => s.Order)
            .ToArrayAsync(cancellationToken);
    }
}
