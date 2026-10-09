using System.Reflection;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using RescuePC.Software.Logging.Behaviors;

namespace Portfolio.Chat.Application;

public static class ServiceCollectionExtensions
{
    /// <summary>MediatR without a unit of work: the chat module has no database yet.</summary>
    public static void AddChatMediatR(this IServiceCollection services, params Assembly[] assemblies)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(assemblies));
        services.TryAddEnumerable(ServiceDescriptor.Transient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>)));
    }
}
