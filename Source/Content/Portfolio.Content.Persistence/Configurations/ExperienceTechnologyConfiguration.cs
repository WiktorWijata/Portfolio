using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Content.Domain;

namespace Portfolio.Content.Persistence.Configurations;

public class ExperienceTechnologyConfiguration : IEntityTypeConfiguration<ExperienceTechnology>
{
    public void Configure(EntityTypeBuilder<ExperienceTechnology> builder)
    {
        builder.HasKey(et => new { et.ExperienceId, et.TechnologyId });

        builder.HasOne(et => et.Technology)
            .WithMany()
            .HasForeignKey(et => et.TechnologyId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
