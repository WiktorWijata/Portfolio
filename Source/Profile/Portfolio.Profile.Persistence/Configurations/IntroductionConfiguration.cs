using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Persistence.Configurations;

public class IntroductionConfiguration : IEntityTypeConfiguration<Introduction>
{
    public void Configure(EntityTypeBuilder<Introduction> builder)
    {
        builder.HasIndex(i => i.ProfileId).IsUnique();

        builder.HasOne<Domain.Profile>()
            .WithMany()
            .HasForeignKey(i => i.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.OwnsMany(i => i.Translations, translation =>
        {
            translation.ToTable("IntroductionTranslation");
            translation.WithOwner().HasForeignKey(t => t.IntroductionId);
            translation.HasKey(t => new { t.IntroductionId, t.LanguageCode });
            translation.HasOne<Language>()
                .WithMany()
                .HasForeignKey(t => t.LanguageCode);
        });
    }
}
