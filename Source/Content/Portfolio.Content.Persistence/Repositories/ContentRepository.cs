using Microsoft.EntityFrameworkCore;
using Portfolio.Content.Domain.Repositories;

namespace Portfolio.Content.Persistence.Repositories;

public class ContentRepository : IContentRepository
{
    private readonly ContentDbContext _context;

    public ContentRepository(ContentDbContext context)
    {
        _context = context;
    }
    public async Task<Domain.Content> GetContentByLanguageCodeAsync(Domain.LanguageCode languageCode, CancellationToken cancellationToken = default)
    {
        return await _context.Contents
            .AsSplitQuery()
            .Include(c => c.Language)
            .Include(c => c.Hero)
                .ThenInclude(h => h.AboutMe)
                    .ThenInclude(a => a.Description)
            .Include(c => c.Skills)
                .ThenInclude(s => s.Category)
            .Include(c => c.Projects)
                .ThenInclude(p => p.Technologies)
            .Include(c => c.Experiences)
                .ThenInclude(e => e.Technologies)
            .Include(c => c.Experiences)
                .ThenInclude(e => e.Achievements)
            .Include(c => c.Educations)
            .Include(c => c.Facts)
            .Include(c => c.Contacts)
            .SingleAsync(c => c.LanguageCode == languageCode, cancellationToken);
    }
}
