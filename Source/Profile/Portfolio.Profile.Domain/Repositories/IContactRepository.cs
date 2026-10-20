namespace Portfolio.Profile.Domain.Repositories;

public interface IContactRepository
{
    Task<IEnumerable<Contact>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default);
}
