using Microsoft.Extensions.DependencyInjection;
using Portfolio.Content.Domain.Repositories;
using Portfolio.Content.Persistence.Repositories;
using RescuePC.Software.EntityFrameworkCore;

namespace Portfolio.Content.Persistence;

public static class ServiceCollectionExtensions
{
    public static void AddEntityFramework(this IServiceCollection services, string connectionString)
    {
        services.AddEntityFramework<ContentDbContext>(connectionString,
            repositories: repos =>
            {
                repos.AddScoped<ILanguageRepository, LanguageRepository>();
            });
    }
}
