using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Content.Domain;

namespace Portfolio.Content.Persistence.Configurations;

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.HasMany(p => p.Technologies)
            .WithMany()
            .UsingEntity<ProjectTechnology>(
                j => j.HasOne<Technology>().WithMany().HasForeignKey(pt => pt.TechnologyId),
                j => j.HasOne<Project>().WithMany().HasForeignKey(pt => pt.ProjectId),
                j => j.HasKey(pt => new { pt.ProjectId, pt.TechnologyId }));
    }
}
