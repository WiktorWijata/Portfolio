namespace Portfolio.Profile.Application;

public static class SelectTranslatedExtensions
{
    /// <summary>
    /// Pairs each entity with the translation returned by <paramref name="getTranslation"/>
    /// (typically <c>entity.GetTranslation(languageCode)</c>); an entity with none is left
    /// out, not an error. Chain a normal <c>.Select(...)</c> to map the pairs to a DTO.
    /// </summary>
    public static IEnumerable<(TEntity Entity, TTranslation Translation)> SelectTranslated<TEntity, TTranslation>(
        this IEnumerable<TEntity> entities,
        Func<TEntity, TTranslation?> getTranslation)
        where TTranslation : class
    {
        foreach (var entity in entities)
        {
            var translation = getTranslation(entity);
            if (translation is not null)
            {
                yield return (entity, translation);
            }
        }
    }
}
