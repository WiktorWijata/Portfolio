using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Contracts;

namespace Portfolio.Chat.Infrastructure;

public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Registers the chat module. The host passes the assemblies that hold its controllers; every action marked with
    /// <c>[ChatTool]</c> there becomes a tool. The registry is built right here, so an invalid tool stops the
    /// application at startup instead of failing a chat request.
    /// </summary>
    public static IServiceCollection AddChat(this IServiceCollection services, params Assembly[] controllerAssemblies)
    {
        if (controllerAssemblies.Length == 0)
        {
            throw new ArgumentException("Pass the assemblies that contain the controllers exposing chat tools.", nameof(controllerAssemblies));
        }

        services.AddSingleton(ChatToolRegistry.FromAssemblies(controllerAssemblies));
        services.AddScoped<IChatToolCatalog, ControllerChatToolCatalog>();

        return services;
    }
}
