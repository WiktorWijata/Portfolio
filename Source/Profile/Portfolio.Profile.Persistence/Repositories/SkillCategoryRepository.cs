using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class SkillCategoryRepository : ISkillCategoryRepository
{
    private readonly ProfileDbContext _context;

    public SkillCategoryRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<SkillCategory>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Set<SkillCategory>()
            .OrderBy(c => c.Order)
            .ToArrayAsync(cancellationToken);
    }
}
