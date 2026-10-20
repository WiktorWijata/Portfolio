namespace RescuePC.Portfolio.BuildingBlocks.Application;

/// <summary>
/// Lets work that has no HTTP request (a background job) run as a caller with a chosen language. Set
/// <see cref="LanguageCode"/> on a new scope before anything resolves <see cref="ICallerContext"/> in it.
/// </summary>
public sealed class CallerLanguageOverride
{
    public string? LanguageCode { get; set; }
}
