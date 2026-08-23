using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Content.Domain;

namespace Portfolio.Content.Persistence.Configurations;

public class ContentConfiguration : IEntityTypeConfiguration<Domain.Content>
{
    public void Configure(EntityTypeBuilder<Domain.Content> builder)
    {
        builder.HasOne(c => c.Language)
            .WithMany()
            .HasForeignKey(c => c.LanguageCode);

        builder.HasOne(c => c.Hero)
            .WithOne()
            .HasForeignKey<Hero>(h => h.ContentId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Skills)
            .WithOne()
            .HasForeignKey(s => s.ContentId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Projects)
            .WithOne()
            .HasForeignKey(p => p.ContentId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Experiences)
            .WithOne()
            .HasForeignKey(e => e.ContentId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Educations)
            .WithOne()
            .HasForeignKey(e => e.ContentId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Facts)
            .WithOne()
            .HasForeignKey(f => f.ContentId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Contacts)
            .WithOne()
            .HasForeignKey(c => c.ContentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
