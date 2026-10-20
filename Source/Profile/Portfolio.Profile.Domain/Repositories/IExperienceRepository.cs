namespace Portfolio.Profile.Domain.Repositories;

public interface IExperienceRepository
{
    Task<IEnumerable<Experience>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default);
}
