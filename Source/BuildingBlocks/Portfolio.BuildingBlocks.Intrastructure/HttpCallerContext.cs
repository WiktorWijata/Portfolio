using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;

namespace RescuePC.Portfolio.BuildingBlocks.Application;

/// <summary>Resolves <see cref="ICallerContext"/> from the current request's Accept-Language header.</summary>
public class HttpCallerContext : ICallerContext
{
    private static readonly HashSet<string> SupportedLanguageCodes = ["PL", "EN"];
    private const string FallbackLanguageCode = "PL";

    public HttpCallerContext(IHttpContextAccessor httpContextAccessor)
    {
        LanguageCode = ResolveLanguageCode(httpContextAccessor.HttpContext);
    }

    public string LanguageCode { get; }

    private static string ResolveLanguageCode(HttpContext? httpContext)
    {
        if (httpContext is null || !httpContext.Request.Headers.TryGetValue("Accept-Language", out StringValues header))
        {
            return FallbackLanguageCode;
        }

        var code = header.ToString().Split(',', ';', '-').FirstOrDefault()?.Trim().ToUpperInvariant();

        return code is not null && SupportedLanguageCodes.Contains(code) ? code : FallbackLanguageCode;
    }
}

public static class CallerContextServiceCollectionExtensions
{
    public static IServiceCollection AddCallerContext(this IServiceCollection services)
    {
        services.AddHttpContextAccessor();
        services.AddScoped<ICallerContext, HttpCallerContext>();

        return services;
    }
}
