using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Content.Domain;

namespace Portfolio.Content.Persistence.Configurations;

public class HeroConfiguration : IEntityTypeConfiguration<Hero>
{
    public void Configure(EntityTypeBuilder<Hero> builder)
    {
        builder.HasOne(h => h.AboutMe)
            .WithOne()
            .HasForeignKey<AboutMe>(a => a.HeroId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
