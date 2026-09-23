using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Persistence.Configurations;

public class AboutMeConfiguration : IEntityTypeConfiguration<AboutMe>
{
    public void Configure(EntityTypeBuilder<AboutMe> builder)
    {
        builder.HasMany(a => a.Description)
            .WithOne()
            .HasForeignKey(d => d.AboutMeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
