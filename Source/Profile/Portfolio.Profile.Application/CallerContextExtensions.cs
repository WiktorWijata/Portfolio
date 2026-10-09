using Portfolio.Profile.Domain;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Profile.Application;

public static class CallerContextExtensions
{
    /// <summary>The caller's language, parsed into this module's own <see cref="LanguageCode"/>.</summary>
    public static LanguageCode GetLanguageCode(this ICallerContext callerContext)
    {
        return Enum.Parse<LanguageCode>(callerContext.LanguageCode, ignoreCase: true);
    }
}
