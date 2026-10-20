namespace Portfolio.Profile.Domain.Repositories;

public interface ISkillRepository
{
    Task<IEnumerable<Skill>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default);
}
