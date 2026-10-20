namespace Portfolio.Profile.Domain.Repositories;

public interface ISpecializationRepository
{
    Task<IEnumerable<Specialization>> GetAllAsync(Guid profileId, CancellationToken cancellationToken = default);
}
