using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Persistence.Configurations;

public class SpecializationConfiguration : IEntityTypeConfiguration<Specialization>
{
    public void Configure(EntityTypeBuilder<Specialization> builder)
    {
        builder.HasOne<Domain.Profile>()
            .WithMany()
            .HasForeignKey(s => s.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.OwnsMany(s => s.Translations, translation =>
        {
            translation.ToTable("SpecializationTranslation");
            translation.WithOwner().HasForeignKey(t => t.SpecializationId);
            translation.HasKey(t => new { t.SpecializationId, t.LanguageCode });
            translation.HasOne<Language>()
                .WithMany()
                .HasForeignKey(t => t.LanguageCode);
        });

        builder.OwnsMany(s => s.Technologies, technology =>
        {
            technology.ToTable("SpecializationTechnology");
            technology.WithOwner().HasForeignKey(t => t.SpecializationId);
            technology.HasKey(t => new { t.SpecializationId, t.TechnologyId });
            technology.HasOne<Technology>()
                .WithMany()
                .HasForeignKey(t => t.TechnologyId);
        });
    }
}
