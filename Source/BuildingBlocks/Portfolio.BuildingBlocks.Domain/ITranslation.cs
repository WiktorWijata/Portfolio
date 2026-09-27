namespace RescuePC.Portfolio.BuildingBlocks.Domain;

/// <summary>A `*Translation` row keyed by a language code — see TranslationExtensions.ForLanguage.</summary>
public interface ITranslation<TLanguageCode> where TLanguageCode : struct, Enum
{
    TLanguageCode LanguageCode { get; }
}
