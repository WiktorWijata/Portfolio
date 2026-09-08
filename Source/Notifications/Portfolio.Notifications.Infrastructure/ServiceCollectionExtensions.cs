using Microsoft.Extensions.DependencyInjection;
using Portfolio.Notifications.Application;
using Portfolio.Notifications.Application.CommandHandlers;
using Portfolio.Notifications.Contracts;
using Portfolio.Notifications.Persistence;

namespace Portfolio.Notifications.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static void AddNotifications(this IServiceCollection services, string connectionString)
    {
        services.AddNotificationsMediatR<NotificationDbContext>(typeof(PrepareNotificationToSendCommandHandler).Assembly);
        services.AddEntityFramework(connectionString);
        services.AddScoped<INotificationsModule, NotificationsModule>();
    }
}
