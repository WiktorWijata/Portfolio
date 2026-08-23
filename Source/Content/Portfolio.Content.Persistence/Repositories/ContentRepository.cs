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
            .IncludeLanguageAndHero()
            .IncludeSkills()
            .IncludeProjects()
            .IncludeExperiences()
            .IncludeEducationsFactsAndContacts()
            .SingleAsync(c => c.LanguageCode == languageCode, cancellationToken);
    }
}

internal static class ContentQueryableExtensions
{
    public static IQueryable<Domain.Content> IncludeLanguageAndHero(this IQueryable<Domain.Content> query) =>
        query.Include(c => c.Language)
            .Include(c => c.Hero)
                .ThenInclude(h => h.AboutMe)
                    .ThenInclude(a => a.Description.OrderBy(d => d.Order));

    public static IQueryable<Domain.Content> IncludeSkills(this IQueryable<Domain.Content> query) =>
        query.Include(c => c.Skills)
            .ThenInclude(s => s.Category);

    public static IQueryable<Domain.Content> IncludeProjects(this IQueryable<Domain.Content> query) =>
        query.Include(c => c.Projects.OrderBy(p => p.Order))
            .ThenInclude(p => p.Technologies.OrderBy(pt => pt.Order))
                .ThenInclude(pt => pt.Technology);

    public static IQueryable<Domain.Content> IncludeExperiences(this IQueryable<Domain.Content> query) =>
        query.Include(c => c.Experiences.OrderByDescending(exp => exp.StartDate))
                .ThenInclude(e => e.Technologies!.OrderBy(et => et.Order))
                    .ThenInclude(et => et.Technology)
            .Include(c => c.Experiences)
                .ThenInclude(e => e.Achievements!.OrderBy(a => a.Order));

    public static IQueryable<Domain.Content> IncludeEducationsFactsAndContacts(this IQueryable<Domain.Content> query) =>
        query.Include(c => c.Educations.OrderByDescending(edu => edu.StartDate))
            .Include(c => c.Facts)
            .Include(c => c.Contacts);
}
