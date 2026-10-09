using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;

namespace RescuePC.Portfolio.BuildingBlocks.Application;

/// <summary>Resolves <see cref="ICallerContext"/> from the current request's Accept-Language header.</summary>
public class HttpCallerContext : ICallerContext
{
    public HttpCallerContext(IHttpContextAccessor httpContextAccessor)
    {
        LanguageCode = ResolveLanguageCode(httpContextAccessor.HttpContext);
    }

    public string LanguageCode { get; }

    private static string ResolveLanguageCode(HttpContext? httpContext)
    {
        if (httpContext is null || !httpContext.Request.Headers.TryGetValue("Accept-Language", out StringValues header))
        {
            return CallerLanguages.Fallback;
        }

        return CallerLanguages.Resolve(header.ToString().Split(',', ';', '-').FirstOrDefault());
    }
}

public static class CallerContextServiceCollectionExtensions
{
    public static IServiceCollection AddCallerContext(this IServiceCollection services)
    {
        services.AddHttpContextAccessor();
        services.AddScoped<CallerLanguageOverride>();
        services.AddScoped<ICallerContext>(provider =>
            provider.GetRequiredService<CallerLanguageOverride>().LanguageCode is { } languageCode
                ? new FixedCallerContext(languageCode)
                : ActivatorUtilities.CreateInstance<HttpCallerContext>(provider));

        return services;
    }
}
