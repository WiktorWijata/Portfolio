namespace RescuePC.Portfolio.BuildingBlocks.Application;

/// <summary>
/// Ambient data about whoever is calling the current request — an anonymous site visitor
/// today, possibly an authenticated user once an auth module exists. Language is a caller
/// preference (read from the Accept-Language header, never passed as a parameter), not a
/// property of any profile; UserId/Claims are expected to join it here later.
/// </summary>
public interface ICallerContext
{
    /// <summary>Two-letter language code (e.g. "PL"), already resolved with a fallback — never null or unknown.</summary>
    string LanguageCode { get; }
}
