namespace Portfolio.Profile.Domain.Repositories;

public interface IAspirationRepository
{
    Task<IEnumerable<Aspiration>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default);
}
