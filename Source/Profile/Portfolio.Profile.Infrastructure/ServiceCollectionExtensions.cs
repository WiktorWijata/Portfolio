using Microsoft.Extensions.DependencyInjection;
using Portfolio.Profile.Contracts;
using Portfolio.Profile.Application;
using Portfolio.Profile.Application.QueryHandlers;
using Portfolio.Profile.Persistence;

namespace Portfolio.Profile.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static void AddProfile(this IServiceCollection services, string connectionString)
    {
        services.AddProfileMediatR<ProfileDbContext>(typeof(GetLanguagesQueryHandler).Assembly);
        services.AddEntityFramework(connectionString);
        services.AddScoped<IProfileModule, ProfileModule>();
    }
}
