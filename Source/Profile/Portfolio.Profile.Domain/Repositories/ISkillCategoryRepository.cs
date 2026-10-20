namespace Portfolio.Profile.Domain.Repositories;

public interface ISkillCategoryRepository
{
    Task<IEnumerable<SkillCategory>> GetAllAsync(CancellationToken cancellationToken = default);
}
