using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence.Repositories;

public class ProfileRepository : IProfileRepository
{
    private readonly ProfileDbContext _context;

    public ProfileRepository(ProfileDbContext context)
    {
        _context = context;
    }
    public async Task<Domain.Profile> GetProfileByLanguageCodeAsync(Domain.LanguageCode languageCode, CancellationToken cancellationToken = default)
    {
        return await _context.Profiles
            .AsSplitQuery()
            .IncludeLanguageAndHero()
            .IncludeSkills()
            .IncludeProjects()
            .IncludeExperiences()
            .IncludeEducationsFactsAndContacts()
            .SingleAsync(c => c.LanguageCode == languageCode, cancellationToken);
    }
}

internal static class ProfileQueryableExtensions
{
    public static IQueryable<Domain.Profile> IncludeLanguageAndHero(this IQueryable<Domain.Profile> query) =>
        query.Include(c => c.Language)
            .Include(c => c.Hero)
                .ThenInclude(h => h.AboutMe)
                    .ThenInclude(a => a.Description.OrderBy(d => d.Order));

    public static IQueryable<Domain.Profile> IncludeSkills(this IQueryable<Domain.Profile> query) =>
        query.Include(c => c.Skills)
            .ThenInclude(s => s.Category);

    public static IQueryable<Domain.Profile> IncludeProjects(this IQueryable<Domain.Profile> query) =>
        query.Include(c => c.Projects.OrderBy(p => p.Order))
            .ThenInclude(p => p.Technologies.OrderBy(pt => pt.Order))
                .ThenInclude(pt => pt.Technology);

    public static IQueryable<Domain.Profile> IncludeExperiences(this IQueryable<Domain.Profile> query) =>
        query.Include(c => c.Experiences.OrderByDescending(exp => exp.StartDate))
                .ThenInclude(e => e.Technologies!.OrderBy(et => et.Order))
                    .ThenInclude(et => et.Technology)
            .Include(c => c.Experiences)
                .ThenInclude(e => e.Achievements!.OrderBy(a => a.Order));

    public static IQueryable<Domain.Profile> IncludeEducationsFactsAndContacts(this IQueryable<Domain.Profile> query) =>
        query.Include(c => c.Educations.OrderByDescending(edu => edu.StartDate))
            .Include(c => c.Facts)
            .Include(c => c.Contacts);
}
