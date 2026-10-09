using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class CertificateRepository : ICertificateRepository
{
    private readonly ProfileDbContext _context;

    public CertificateRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Certificate>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default)
    {
        return await _context.Set<Certificate>()
            .Where(c => c.ProfileId == profileId)
            .OrderByDescending(c => c.IssuedOn)
            .ToArrayAsync(cancellationToken);
    }
}
