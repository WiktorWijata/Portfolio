using Microsoft.EntityFrameworkCore;
using Portfolio.Content.Application;
using Portfolio.Content.Domain;
using Portfolio.Content.Persistence.Configurations;

namespace Portfolio.Content.Persistence;

public class ContentDbContext : EfContext, IContentUnitOfWork
{
    protected override string DefaultSchema => "content";

    public ContentDbContext(DbContextOptions<ContentDbContext> options) : base(options) { }

    internal DbSet<Domain.Content> Contents { get; set; }

    internal DbSet<Language> Languages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ContentConfiguration).Assembly);
    }
}
