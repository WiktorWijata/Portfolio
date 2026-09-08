namespace RescuePC.Portfolio.BuildingBlocks.Application;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
public sealed class RateLimitAttribute : Attribute
{
    public int PermitLimit { get; }
    public int WindowSeconds { get; }

    public RateLimitAttribute(int permitLimit, int windowSeconds)
    {
        if (permitLimit <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(permitLimit), "PermitLimit musi być większy od zera.");
        }

        if (windowSeconds <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(windowSeconds), "WindowSeconds musi być większy od zera.");
        }

        PermitLimit = permitLimit;
        WindowSeconds = windowSeconds;
    }
}
