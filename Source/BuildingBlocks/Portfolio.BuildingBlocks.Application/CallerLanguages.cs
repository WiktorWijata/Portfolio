namespace RescuePC.Portfolio.BuildingBlocks.Application;

/// <summary>The languages the API can answer in, and how a requested code maps onto them.</summary>
public static class CallerLanguages
{
    public const string Fallback = "PL";

    public static IReadOnlyCollection<string> Supported { get; } = ["PL", "EN"];

    /// <summary>Upper-cases the code and falls back to <see cref="Fallback"/> when it is missing or unsupported.</summary>
    public static string Resolve(string? code)
    {
        var normalized = code?.Trim().ToUpperInvariant();

        return normalized is not null && Supported.Contains(normalized) ? normalized : Fallback;
    }
}
