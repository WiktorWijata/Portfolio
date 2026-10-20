using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Persistence.Configurations;

public class ProfileConfiguration : IEntityTypeConfiguration<Domain.Profile>
{
    public void Configure(EntityTypeBuilder<Domain.Profile> builder)
    {
        builder.HasMany<Skill>()
            .WithOne()
            .HasForeignKey(s => s.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany<Experience>()
            .WithOne()
            .HasForeignKey(e => e.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
