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
    public async Task<Domain.Content> GetContentByLanguageCodeAsync(string languageCode, CancellationToken cancellationToken = default)
    {
        return await _context.Contents
            .Include(c => c.Language)
            .Include(c => c.Hero)
                .ThenInclude(h => h.AboutMe)
                    .ThenInclude(a => a.Description)
            //.Include(c => c.Skills)
            //.Include(c => c.Projects)
            //.Include(c => c.Experiences)
            //.Include(c => c.Educations)
            //.Include(c => c.Facts)
            //.Include(c => c.Contacts)
            .SingleAsync(c => c.LanguageCode.ToString().ToUpper() == languageCode.ToUpper(), cancellationToken);
    }
}
