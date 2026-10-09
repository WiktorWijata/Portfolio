using System.Reflection;
using Portfolio.Chat.Contracts;

namespace RescuePC.Portfolio.Api.Chat;

public static class ChatToolsServiceCollectionExtensions
{
    /// <summary>
    /// Registers the chat tool catalog. The registry is built right here, so an invalid <c>[ChatTool]</c>
    /// stops the application at startup. Scans this assembly unless others are given.
    /// </summary>
    public static IServiceCollection AddChatTools(this IServiceCollection services, params Assembly[] assemblies)
    {
        var registry = ChatToolRegistry.FromAssemblies(assemblies.Length > 0 ? assemblies : [typeof(ChatToolRegistry).Assembly]);

        services.AddSingleton(registry);
        services.AddScoped<IChatToolCatalog, ControllerChatToolCatalog>();

        return services;
    }
}
