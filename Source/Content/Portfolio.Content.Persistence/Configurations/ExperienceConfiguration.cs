using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Content.Domain;

namespace Portfolio.Content.Persistence.Configurations;

public class ExperienceConfiguration : IEntityTypeConfiguration<Experience>
{
    public void Configure(EntityTypeBuilder<Experience> builder)
    {
        builder.HasMany(e => e.Achievements)
            .WithOne()
            .HasForeignKey(a => a.ExperienceId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(e => e.Technologies)
            .WithMany()
            .UsingEntity<ExperienceTechnology>(
                j => j.HasOne<Technology>().WithMany().HasForeignKey(et => et.TechnologyId),
                j => j.HasOne<Experience>().WithMany().HasForeignKey(et => et.ExperienceId),
                j => j.HasKey(et => new { et.ExperienceId, et.TechnologyId }));
    }
}
