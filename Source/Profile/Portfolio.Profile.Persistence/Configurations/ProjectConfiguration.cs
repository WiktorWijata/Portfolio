using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Persistence.Configurations;

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.HasOne<Domain.Profile>()
            .WithMany()
            .HasForeignKey(p => p.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.OwnsMany(p => p.Translations, translation =>
        {
            translation.ToTable("ProjectTranslation");
            translation.WithOwner().HasForeignKey(t => t.ProjectId);
            translation.HasKey(t => new { t.ProjectId, t.LanguageCode });
            translation.HasOne<Language>()
                .WithMany()
                .HasForeignKey(t => t.LanguageCode);
        });

        builder.OwnsMany(p => p.Technologies, technology =>
        {
            technology.ToTable("ProjectTechnology");
            technology.WithOwner().HasForeignKey(t => t.ProjectId);
            technology.HasKey(t => new { t.ProjectId, t.TechnologyId });
            technology.HasOne<Technology>()
                .WithMany()
                .HasForeignKey(t => t.TechnologyId);
        });

        builder.OwnsMany(p => p.ArchitectureBlocks, block =>
        {
            block.ToTable("ProjectArchitectureBlock");
            block.WithOwner().HasForeignKey(b => b.ProjectId);
            block.HasKey(b => b.Id);

            block.OwnsMany(b => b.Translations, translation =>
            {
                translation.ToTable("ProjectArchitectureBlockTranslation");
                translation.WithOwner().HasForeignKey(t => t.ProjectArchitectureBlockId);
                translation.HasKey(t => new { t.ProjectArchitectureBlockId, t.LanguageCode });
                translation.HasOne<Language>()
                    .WithMany()
                    .HasForeignKey(t => t.LanguageCode);
            });
        });

        builder.OwnsMany(p => p.ArchitectureNotes, note =>
        {
            note.ToTable("ProjectArchitectureNote");
            note.WithOwner().HasForeignKey(n => n.ProjectId);
            note.HasKey(n => n.Id);

            note.OwnsMany(n => n.Translations, translation =>
            {
                translation.ToTable("ProjectArchitectureNoteTranslation");
                translation.WithOwner().HasForeignKey(t => t.ProjectArchitectureNoteId);
                translation.HasKey(t => new { t.ProjectArchitectureNoteId, t.LanguageCode });
                translation.HasOne<Language>()
                    .WithMany()
                    .HasForeignKey(t => t.LanguageCode);
            });
        });
    }
}
