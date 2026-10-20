namespace Portfolio.Profile.Domain;

public interface ICurrentTenant
{
    Task<Guid> GetProfileIdAsync(CancellationToken cancellationToken = default);
}
