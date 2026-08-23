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
            .WithOne()
            .HasForeignKey(et => et.ExperienceId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
