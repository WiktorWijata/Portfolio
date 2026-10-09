namespace RescuePC.Portfolio.BuildingBlocks.Domain;

public static class TranslationExtensions
{
    /// <summary>
    /// The translation for <paramref name="languageCode"/>, or the one for
    /// <paramref name="fallbackLanguageCode"/> when that language is missing —
    /// the translation-table rule: missing language = missing row = fallback.
    /// </summary>
    public static T? ForLanguage<T, TLanguageCode>(this IEnumerable<T> translations, TLanguageCode languageCode, TLanguageCode fallbackLanguageCode)
        where T : ITranslation<TLanguageCode>
        where TLanguageCode : struct, Enum
    {
        T? match = default;
        T? fallback = default;

        foreach (var translation in translations)
        {
            if (translation.LanguageCode.Equals(languageCode))
            {
                match = translation;
            }
            else if (translation.LanguageCode.Equals(fallbackLanguageCode))
            {
                fallback = translation;
            }
        }

        return match ?? fallback;
    }
}
