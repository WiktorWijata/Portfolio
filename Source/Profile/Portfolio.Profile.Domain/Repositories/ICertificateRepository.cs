namespace Portfolio.Profile.Domain.Repositories;

public interface ICertificateRepository
{
    Task<IEnumerable<Certificate>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default);
}
