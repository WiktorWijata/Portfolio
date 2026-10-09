using IntegratorAI.Api.Contracts.Chat;
using IntegratorAI.Api.Contracts.Context;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Chat.Infrastructure;

namespace Portfolio.Api.UnitTests.Chat;

public class AssistantClientRegistrationTests
{
    [Fact]
    public void The_clients_can_be_created_with_the_package_versions_the_api_really_uses()
    {
        // The API pulls in Refit through RescuePC.Software.Refit (Refit 15), while IntegratorAI.Api.Contracts brings its own
        // interfaces. If their Refit generations do not match, creating the client throws, but only at the first call.
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?> { ["Assistant:BaseUrl"] = "https://example.test/integratorai/api" })
            .Build();
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddAssistantClient(configuration);

        using var provider = services.BuildServiceProvider();

        Assert.NotNull(provider.GetRequiredService<IContextApi>());
        Assert.NotNull(provider.GetRequiredService<IStreamChatApi>());
    }
}
