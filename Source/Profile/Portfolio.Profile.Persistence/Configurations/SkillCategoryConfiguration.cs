using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Persistence.Configurations;

public class SkillCategoryConfiguration : IEntityTypeConfiguration<SkillCategory>
{
    public void Configure(EntityTypeBuilder<SkillCategory> builder)
    {
        builder.OwnsMany(c => c.Translations, translation =>
        {
            translation.ToTable("SkillCategoryTranslation");
            translation.WithOwner().HasForeignKey(t => t.SkillCategoryId);
            translation.HasKey(t => new { t.SkillCategoryId, t.LanguageCode });
            translation.HasOne<Language>()
                .WithMany()
                .HasForeignKey(t => t.LanguageCode);
        });
    }
}
