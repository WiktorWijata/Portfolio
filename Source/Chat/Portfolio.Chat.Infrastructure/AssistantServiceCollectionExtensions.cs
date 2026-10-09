using Portfolio.Chat.Application;
using IntegratorAI.Api.Contracts.Chat;
using IntegratorAI.Api.Contracts.Context;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RescuePC.Software.Refit;

namespace Portfolio.Chat.Infrastructure;

public static class AssistantServiceCollectionExtensions
{
    /// <summary>
    /// Registers the typed clients for IntegratorAI. A missing <c>Assistant:BaseUrl</c> does not stop the application,
    /// so the rest of the site still runs without it; the first call to IntegratorAI reports what is missing.
    /// </summary>
    public static IServiceCollection AddAssistantClient(this IServiceCollection services, IConfiguration configuration)
    {
        var section = configuration.GetSection(AssistantOptions.SectionName);
        services.Configure<AssistantOptions>(section);

        var baseUrl = section.Get<AssistantOptions>()?.BaseUrl;

        services.AddRefitClient<IContextApi>("Assistant.Context", client => Configure(client, baseUrl));
        services.AddRefitClient<IStreamChatApi>("Assistant.StreamChat", client => Configure(client, baseUrl));

        return services;
    }

    private static void Configure(HttpClient client, string? configuredBaseUrl)
    {
        var baseUrl = configuredBaseUrl?.Trim().TrimEnd('/');

        if (string.IsNullOrEmpty(baseUrl) || !Uri.TryCreate(baseUrl, UriKind.Absolute, out var baseAddress))
        {
            throw new InvalidOperationException($"Configuration value '{AssistantOptions.SectionName}:BaseUrl' is missing or is not an absolute URL.");
        }

        // No trailing slash: the paths in the IntegratorAI contract start with one, and Refit would double it.
        client.BaseAddress = baseAddress;

        // A streamed answer can take long; the timeout applies to the whole call, not to each chunk.
        client.Timeout = TimeSpan.FromMinutes(5);
    }
}
