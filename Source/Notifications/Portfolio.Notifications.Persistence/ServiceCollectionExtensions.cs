using Microsoft.Extensions.DependencyInjection;
using Portfolio.Notifications.Domain.Repositories;
using Portfolio.Notifications.Persistence.Repositories;
using RescuePC.Software.EntityFrameworkCore;

namespace Portfolio.Notifications.Persistence;

public static class ServiceCollectionExtensions
{
    public static void AddEntityFramework(this IServiceCollection services, string connectionString)
    {
        services.AddEntityFramework<NotificationDbContext>(connectionString,
            repositories: repos =>
            {
                repos.AddScoped<IEmailRepository, EmailRepository>();
            });
    }
}
