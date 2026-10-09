using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.BuildingBlocks.UnitTests;

public class CallerContextTests
{
    private static ServiceProvider CreateProvider(string? acceptLanguage)
    {
        var provider = new ServiceCollection().AddCallerContext().BuildServiceProvider(new ServiceProviderOptions { ValidateScopes = true });

        if (acceptLanguage is not null)
        {
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers.AcceptLanguage = acceptLanguage;
            provider.GetRequiredService<IHttpContextAccessor>().HttpContext = httpContext;
        }

        return provider;
    }

    [Theory]
    [InlineData("en-US,en;q=0.9", "EN")]
    [InlineData("pl", "PL")]
    [InlineData("EN", "EN")]
    [InlineData("de-DE,de;q=0.9", "PL")]
    public void Language_comes_from_the_Accept_Language_header(string header, string expected)
    {
        using var provider = CreateProvider(header);
        using var scope = provider.CreateScope();

        Assert.Equal(expected, scope.ServiceProvider.GetRequiredService<ICallerContext>().LanguageCode);
    }

    [Fact]
    public void Language_falls_back_when_there_is_no_request()
    {
        using var provider = CreateProvider(acceptLanguage: null);
        using var scope = provider.CreateScope();

        Assert.Equal("PL", scope.ServiceProvider.GetRequiredService<ICallerContext>().LanguageCode);
    }

    [Fact]
    public void An_override_wins_over_the_request_header()
    {
        using var provider = CreateProvider("pl");
        using var scope = provider.CreateScope();
        scope.ServiceProvider.GetRequiredService<CallerLanguageOverride>().LanguageCode = "en";

        Assert.Equal("EN", scope.ServiceProvider.GetRequiredService<ICallerContext>().LanguageCode);
    }

    [Fact]
    public void An_override_works_without_any_request()
    {
        using var provider = CreateProvider(acceptLanguage: null);
        using var scope = provider.CreateScope();
        scope.ServiceProvider.GetRequiredService<CallerLanguageOverride>().LanguageCode = "EN";

        Assert.Equal("EN", scope.ServiceProvider.GetRequiredService<ICallerContext>().LanguageCode);
    }

    [Fact]
    public void An_override_applies_only_to_its_own_scope()
    {
        using var provider = CreateProvider("pl");
        using var overridden = provider.CreateScope();
        using var plain = provider.CreateScope();
        overridden.ServiceProvider.GetRequiredService<CallerLanguageOverride>().LanguageCode = "EN";

        Assert.Equal("EN", overridden.ServiceProvider.GetRequiredService<ICallerContext>().LanguageCode);
        Assert.Equal("PL", plain.ServiceProvider.GetRequiredService<ICallerContext>().LanguageCode);
    }

    [Fact]
    public void An_unsupported_override_falls_back()
    {
        using var provider = CreateProvider(acceptLanguage: null);
        using var scope = provider.CreateScope();
        scope.ServiceProvider.GetRequiredService<CallerLanguageOverride>().LanguageCode = "xx";

        Assert.Equal("PL", scope.ServiceProvider.GetRequiredService<ICallerContext>().LanguageCode);
    }

    [Theory]
    [InlineData(null, "PL")]
    [InlineData("", "PL")]
    [InlineData(" en ", "EN")]
    [InlineData("fr", "PL")]
    public void Resolve_normalizes_and_falls_back(string? code, string expected)
    {
        Assert.Equal(expected, CallerLanguages.Resolve(code));
    }
}
