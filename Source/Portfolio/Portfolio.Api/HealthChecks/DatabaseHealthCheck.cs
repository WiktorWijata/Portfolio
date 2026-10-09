using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace RescuePC.Portfolio.Api.HealthChecks;

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
