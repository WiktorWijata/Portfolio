using Microsoft.EntityFrameworkCore;
using Portfolio.Profile.Application;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Persistence.Configurations;

namespace Portfolio.Profile.Persistence;

public class ProfileDbContext : EfContext, IProfileUnitOfWork
{
    protected override string DefaultSchema => "profile";

    public ProfileDbContext(DbContextOptions<ProfileDbContext> options) : base(options) { }

    internal DbSet<Domain.Profile> Profiles { get; set; }

    internal DbSet<Language> Languages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProfileConfiguration).Assembly);
    }
}
