namespace Portfolio.Content.Domain.Repositories;

public interface IContentRepository
{
    Task<Content> GetContentByLanguageCodeAsync(string languageCode, CancellationToken cancellationToken = default);
}
