using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Persistence.Configurations;

public class AspirationConfiguration : IEntityTypeConfiguration<Aspiration>
{
    public void Configure(EntityTypeBuilder<Aspiration> builder)
    {
        builder.HasOne<Domain.Profile>()
            .WithMany()
            .HasForeignKey(a => a.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.OwnsMany(a => a.Translations, translation =>
        {
            translation.ToTable("AspirationTranslation");
            translation.WithOwner().HasForeignKey(t => t.AspirationId);
            translation.HasKey(t => new { t.AspirationId, t.LanguageCode });
            translation.HasOne<Language>()
                .WithMany()
                .HasForeignKey(t => t.LanguageCode);
        });
    }
}
