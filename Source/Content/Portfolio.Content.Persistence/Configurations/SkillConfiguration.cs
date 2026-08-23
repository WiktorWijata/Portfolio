using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Content.Domain;

namespace Portfolio.Content.Persistence.Configurations;

public class SkillConfiguration : IEntityTypeConfiguration<Skill>
{
    public void Configure(EntityTypeBuilder<Skill> builder)
    {
        builder.HasOne(s => s.Category)
            .WithMany()
            .HasForeignKey(s => s.SkillCategoryId);
    }
}
