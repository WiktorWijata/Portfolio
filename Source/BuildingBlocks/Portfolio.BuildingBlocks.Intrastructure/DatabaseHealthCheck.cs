using Microsoft.Data.SqlClient;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace RescuePC.Portfolio.BuildingBlocks.Application;

/// <summary>Reports the API unhealthy when the Portfolio database cannot be reached, since every page depends on it.</summary>
public sealed class DatabaseHealthCheck(string connectionString) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            await using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync(cancellationToken);
            return HealthCheckResult.Healthy();
        }
        catch (Exception exception)
        {
            return HealthCheckResult.Unhealthy("Database is unreachable.", exception);
        }
    }
}

public static class DatabaseHealthCheckServiceCollectionExtensions
{
    /// <summary>Adds a "database" health check that opens a connection with the given connection string.</summary>
    public static IServiceCollection AddDatabaseHealthCheck(this IServiceCollection services, string connectionString)
    {
        services.AddHealthChecks().AddCheck("database", new DatabaseHealthCheck(connectionString));

        return services;
    }
}
