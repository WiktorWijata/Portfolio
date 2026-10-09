namespace Portfolio.Profile.Domain.Repositories;

public interface IEmployerRepository
{
    Task<IReadOnlyDictionary<Guid, Employer>> GetByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken = default);
}
