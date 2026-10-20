using Portfolio.Chat.Application;
using Hangfire;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Portfolio.Chat.Contracts;

namespace Portfolio.Chat.Infrastructure;

public static class ChatContextSyncScheduling
{
    public const string RecurringJobId = "chat-context-sync";

    /// <summary>
    /// Keeps the assistant's context in IntegratorAI current: once now (so a deployment picks up new data) and then daily.
    /// Does nothing when IntegratorAI is not configured, so a local run without it does not fill the job queue with failures.
    /// </summary>
    public static IServiceProvider ScheduleChatContextSync(this IServiceProvider services)
    {
        if (string.IsNullOrWhiteSpace(services.GetRequiredService<IOptions<AssistantOptions>>().Value.BaseUrl))
        {
            services.GetRequiredService<ILoggerFactory>().CreateLogger(typeof(ChatContextSyncScheduling))
                .LogInformation("Assistant:BaseUrl is not set, so the chat context is not synchronized.");

            return services;
        }

        services.GetRequiredService<IRecurringJobManager>().AddOrUpdate<IChatModule>(
            RecurringJobId, module => module.SynchronizeContexts(CancellationToken.None), Cron.Daily());
        services.GetRequiredService<IBackgroundJobClient>().Enqueue<IChatModule>(module => module.SynchronizeContexts(CancellationToken.None));

        return services;
    }
}
