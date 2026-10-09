using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class LanguageRepository : ILanguageRepository
{
    private readonly ProfileDbContext _context;

    public LanguageRepository(ProfileDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Language>> GetLanguagesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Languages.ToArrayAsync(cancellationToken);
    }
}
    