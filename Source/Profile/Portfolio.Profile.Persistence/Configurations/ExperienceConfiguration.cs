using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Persistence.Configurations;

public class ExperienceConfiguration : IEntityTypeConfiguration<Experience>
{
    public void Configure(EntityTypeBuilder<Experience> builder)
    {
        builder.HasOne<Employer>()
            .WithMany()
            .HasForeignKey(e => e.EmployerId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.OwnsMany(e => e.Translations, translation =>
        {
            translation.ToTable("ExperienceTranslation");
            translation.WithOwner().HasForeignKey(t => t.ExperienceId);
            translation.HasKey(t => new { t.ExperienceId, t.LanguageCode });
            translation.HasOne<Language>()
                .WithMany()
                .HasForeignKey(t => t.LanguageCode);
        });

        builder.OwnsMany(e => e.Areas, area =>
        {
            area.ToTable("ExperienceArea");
            area.WithOwner().HasForeignKey(a => a.ExperienceId);
            area.HasKey(a => a.Id);

            area.OwnsMany(a => a.Translations, translation =>
            {
                translation.ToTable("ExperienceAreaTranslation");
                translation.WithOwner().HasForeignKey(t => t.ExperienceAreaId);
                translation.HasKey(t => new { t.ExperienceAreaId, t.LanguageCode });
                translation.HasOne<Language>()
                    .WithMany()
                    .HasForeignKey(t => t.LanguageCode);
            });

            area.OwnsMany(a => a.Responsibilities, responsibility =>
            {
                responsibility.ToTable("ExperienceResponsibility");
                responsibility.WithOwner().HasForeignKey(r => r.ExperienceAreaId);
                responsibility.HasKey(r => r.Id);

                responsibility.OwnsMany(r => r.Translations, translation =>
                {
                    translation.ToTable("ExperienceResponsibilityTranslation");
                    translation.WithOwner().HasForeignKey(t => t.ExperienceResponsibilityId);
                    translation.HasKey(t => new { t.ExperienceResponsibilityId, t.LanguageCode });
                    translation.HasOne<Language>()
                        .WithMany()
                        .HasForeignKey(t => t.LanguageCode);
                });
            });
        });

        builder.OwnsMany(e => e.Technologies, technology =>
        {
            technology.ToTable("ExperienceTechnology");
            technology.WithOwner().HasForeignKey(t => t.ExperienceId);
            technology.HasKey(t => new { t.ExperienceId, t.TechnologyId });
            technology.HasOne<Technology>()
                .WithMany()
                .HasForeignKey(t => t.TechnologyId);
        });
    }
}
