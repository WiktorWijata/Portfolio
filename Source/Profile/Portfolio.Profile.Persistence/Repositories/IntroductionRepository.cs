using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class IntroductionRepository : IIntroductionRepository
{
    private readonly ProfileDbContext _context;

    public IntroductionRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public Task<Introduction?> GetAsync(Guid profileId, CancellationToken cancellationToken = default)
    {
        return _context.Set<Introduction>().SingleOrDefaultAsync(i => i.ProfileId == profileId, cancellationToken);
    }
}
