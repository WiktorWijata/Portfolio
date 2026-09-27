using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class SkillRepository : ISkillRepository
{
    private readonly ProfileDbContext _context;

    public SkillRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Skill>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default)
    {
        return await _context.Set<Skill>()
            .Where(s => s.ProfileId == profileId)
            .OrderBy(s => s.Order)
            .ToArrayAsync(cancellationToken);
    }
}
