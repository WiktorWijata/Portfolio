namespace Portfolio.Content.Domain.Repositories;

public interface IContentRepository
{
    Task<Content> GetContentByLanguageCodeAsync(LanguageCode languageCode, CancellationToken cancellationToken = default);
}
