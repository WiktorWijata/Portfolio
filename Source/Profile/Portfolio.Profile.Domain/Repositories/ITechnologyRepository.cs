namespace Portfolio.Profile.Domain.Repositories;

public interface ITechnologyRepository
{
    Task<IReadOnlyDictionary<Guid, Technology>> GetByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken = default);
}
