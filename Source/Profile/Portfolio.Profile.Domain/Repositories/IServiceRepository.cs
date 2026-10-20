namespace Portfolio.Profile.Domain.Repositories;

public interface IServiceRepository
{
    Task<IEnumerable<Service>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default);
}
