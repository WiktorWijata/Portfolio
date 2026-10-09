using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Profile.Domain;

namespace Portfolio.Profile.Persistence.Configurations;

public class SkillConfiguration : IEntityTypeConfiguration<Skill>
{
    public void Configure(EntityTypeBuilder<Skill> builder)
    {
        builder.HasIndex(s => new { s.ProfileId, s.TechnologyId }).IsUnique();

        builder.HasOne<Technology>()
            .WithMany()
            .HasForeignKey(s => s.TechnologyId);

        builder.HasOne<SkillCategory>()
            .WithMany()
            .HasForeignKey(s => s.SkillCategoryId);
    }
}
