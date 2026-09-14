using Microsoft.EntityFrameworkCore;
using Portfolio.Content.Domain;
using Portfolio.Content.Domain.Repositories;

namespace Portfolio.Content.Persistence.Repositories;

public class LanguageRepository : ILanguageRepository
{
    private readonly ContentDbContext _context;

    public LanguageRepository(ContentDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Language>> GetLanguagesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Languages.ToArrayAsync(cancellationToken);
    }
}
    