namespace Portfolio.Profile.Domain.Repositories;

public interface IProfileRepository
{
    Task<Profile> GetProfileByLanguageCodeAsync(LanguageCode languageCode, CancellationToken cancellationToken = default);
}
