using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Portfolio.Content.Persistence.Configurations;

public class ContentConfiguration : IEntityTypeConfiguration<Domain.Content>
{
    public void Configure(EntityTypeBuilder<Domain.Content> builder)
    {
        builder.HasOne(c => c.Language)
            .WithMany()
            .HasForeignKey(c => c.LanguageCode);

        builder.HasMany(c => c.Skills)
            .WithOne()
            .HasForeignKey(s => s.ContentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
