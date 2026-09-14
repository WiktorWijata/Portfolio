namespace Portfolio.Content.Domain.Repositories;

public interface ILanguageRepository
{
    Task<IEnumerable<Language>> GetLanguagesAsync(CancellationToken cancellationToken = default);
}
