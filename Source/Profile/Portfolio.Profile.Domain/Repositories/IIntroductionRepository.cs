namespace Portfolio.Profile.Domain.Repositories;

public interface IIntroductionRepository
{
    Task<Introduction?> GetAsync(Guid profileId, CancellationToken cancellationToken = default);
}
