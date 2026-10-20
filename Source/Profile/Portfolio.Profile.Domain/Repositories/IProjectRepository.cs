namespace Portfolio.Profile.Domain.Repositories;

public interface IProjectRepository
{
    Task<IEnumerable<Project>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default);
}
