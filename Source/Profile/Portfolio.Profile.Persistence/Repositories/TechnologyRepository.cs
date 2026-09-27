using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class TechnologyRepository : ITechnologyRepository
{
    private readonly ProfileDbContext _context;

    public TechnologyRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyDictionary<Guid, Technology>> GetByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken = default)
    {
        var idList = ids.Distinct().ToArray();

        return await _context.Set<Technology>()
            .Where(t => idList.Contains(t.Id))
            .ToDictionaryAsync(t => t.Id, cancellationToken);
    }
}
