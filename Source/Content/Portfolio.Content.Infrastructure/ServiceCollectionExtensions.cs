using Microsoft.Extensions.DependencyInjection;
using Portfolio.Content.Contracts;
using Portfolio.Content.Application;
using Portfolio.Content.Application.QueryHandlers;
using Portfolio.Content.Persistence;

namespace Portfolio.Content.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static void AddContent(this IServiceCollection services, string connectionString)
    {
        services.AddEntityFrameworkCoreMediatR<ContentDbContext>(typeof(GetLanguagesQueryHandler).Assembly);
        services.AddEntityFramework(connectionString);
        services.AddScoped<IContentModule, ContentModule>();
    }
}
