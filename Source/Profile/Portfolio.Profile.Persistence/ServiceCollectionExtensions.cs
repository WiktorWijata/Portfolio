using Microsoft.Extensions.DependencyInjection;
using Portfolio.Profile.Domain.Repositories;
using Portfolio.Profile.Persistence.Repositories;
using RescuePC.Software.EntityFrameworkCore;

namespace Portfolio.Profile.Persistence;

public static class ServiceCollectionExtensions
{
    public static void AddEntityFramework(this IServiceCollection services, string connectionString)
    {
        services.AddEntityFramework<ProfileDbContext>(connectionString,
            repositories: repos =>
            {
                repos.AddScoped<ILanguageRepository, LanguageRepository>();
                repos.AddScoped<IProfileRepository, ProfileRepository>();
            });
    }
}
