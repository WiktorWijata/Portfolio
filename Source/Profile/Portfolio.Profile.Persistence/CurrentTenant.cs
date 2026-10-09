using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;

namespace Portfolio.Profile.Persistence;

/// <summary>
/// Today's <see cref="ICurrentTenant"/>: delegates to <see cref="IProfileRepository"/>, which
/// holds exactly one profile. Only this class needs to change once resolution moves away
/// from "the one profile in the database" — e.g. to a subdomain or a JWT claim.
/// </summary>
public class CurrentTenant : ICurrentTenant
{
    private readonly IProfileRepository _profileRepository;

    public CurrentTenant(IProfileRepository profileRepository)
    {
        _profileRepository = profileRepository;
    }
   
    public Task<Guid> GetProfileIdAsync(CancellationToken cancellationToken = default)
    {
        return _profileRepository.GetProfileIdAsync(cancellationToken);
    }
}
