using Microsoft.Extensions.DependencyInjection;
using RescuePC.Software.EntityFrameworkCore;
using RescuePC.Software.EntityFrameworkCore.MediatR;
using RescuePC.Software.Logging.Behaviors;
using System.Reflection;

namespace Portfolio.Notifications.Application;

public static class ServiceCollectionExtensions
{
    public static void AddNotificationsMediatR<TUnitOfWork>(this IServiceCollection services, params Assembly[] assemblies)
        where TUnitOfWork : class, IUnitOfWork
    {
        services.AddMediatR<TUnitOfWork>(assemblies, [typeof(LoggingBehavior<,>)]);
    }
}
