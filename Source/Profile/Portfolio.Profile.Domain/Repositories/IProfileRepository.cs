namespace Portfolio.Profile.Domain.Repositories;

public interface IProfileRepository
{
    Task<Guid> GetProfileIdAsync(CancellationToken cancellationToken = default);
}
