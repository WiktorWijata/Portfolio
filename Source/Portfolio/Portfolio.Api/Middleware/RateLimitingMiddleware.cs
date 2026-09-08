using System.Threading.RateLimiting;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace RescuePC.Portfolio.Api.Middleware;

public static class RateLimitingMiddleware
{
    public static IServiceCollection AddRateLimiting(this IServiceCollection services, IConfiguration configuration)
    {
        var defaultPermitLimit = 100;
        var defaultWindowSeconds = 60;
        var queueLimit = 0;

        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

            options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
            {
                var ipAddress = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
                var endpoint = httpContext.GetEndpoint();
                var overrideAttribute = endpoint?.Metadata.GetMetadata<RateLimitAttribute>();

                var permitLimit = overrideAttribute?.PermitLimit ?? defaultPermitLimit;
                var windowSeconds = overrideAttribute?.WindowSeconds ?? defaultWindowSeconds;

                var partitionKey = $"{endpoint?.DisplayName ?? "unknown-endpoint"}:{ipAddress}";

                return RateLimitPartition.GetFixedWindowLimiter(partitionKey, _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = permitLimit,
                    Window = TimeSpan.FromSeconds(windowSeconds),
                    QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                    QueueLimit = queueLimit
                });
            });

            options.OnRejected = async (context, cancellationToken) =>
            {
                var retryAfterSeconds = context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter)
                    ? ((int)retryAfter.TotalSeconds).ToString()
                    : defaultWindowSeconds.ToString();

                context.HttpContext.Response.Headers.RetryAfter = retryAfterSeconds;
                context.HttpContext.Response.ContentType = "application/json";
                await context.HttpContext.Response.WriteAsync(
                    """{"message":"Zbyt wiele żądań. Spróbuj ponownie za chwilę."}""",
                    cancellationToken);
            };
        });

        return services;
    }
}
