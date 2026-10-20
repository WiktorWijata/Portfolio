namespace RescuePC.Portfolio.BuildingBlocks.Application;

/// <summary>An <see cref="ICallerContext"/> with a language chosen in code instead of read from a request.</summary>
public sealed class FixedCallerContext : ICallerContext
{
    public FixedCallerContext(string languageCode)
    {
        LanguageCode = CallerLanguages.Resolve(languageCode);
    }

    public string LanguageCode { get; }
}
