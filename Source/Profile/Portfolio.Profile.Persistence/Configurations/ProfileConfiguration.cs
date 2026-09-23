using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Persistence.Configurations;

public class ProfileConfiguration : IEntityTypeConfiguration<Domain.Profile>
{
    public void Configure(EntityTypeBuilder<Domain.Profile> builder)
    {
        builder.HasOne(c => c.Language)
            .WithMany()
            .HasForeignKey(c => c.LanguageCode);

        builder.HasOne(c => c.Hero)
            .WithOne()
            .HasForeignKey<Hero>(h => h.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Skills)
            .WithOne()
            .HasForeignKey(s => s.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Projects)
            .WithOne()
            .HasForeignKey(p => p.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Experiences)
            .WithOne()
            .HasForeignKey(e => e.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Educations)
            .WithOne()
            .HasForeignKey(e => e.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Facts)
            .WithOne()
            .HasForeignKey(f => f.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Contacts)
            .WithOne()
            .HasForeignKey(c => c.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
