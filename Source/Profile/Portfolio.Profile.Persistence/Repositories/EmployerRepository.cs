using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class EmployerRepository : IEmployerRepository
{
    private readonly ProfileDbContext _context;

    public EmployerRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyDictionary<Guid, Employer>> GetByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken = default)
    {
        var idList = ids.Distinct().ToArray();

        return await _context.Set<Employer>()
            .Where(e => idList.Contains(e.Id))
            .ToDictionaryAsync(e => e.Id, cancellationToken);
    }
}
