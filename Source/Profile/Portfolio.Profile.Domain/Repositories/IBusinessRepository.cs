namespace Portfolio.Profile.Domain.Repositories;

public interface IBusinessRepository
{
    Task<Business?> GetAsync(Guid profileId, CancellationToken cancellationToken = default);
}
