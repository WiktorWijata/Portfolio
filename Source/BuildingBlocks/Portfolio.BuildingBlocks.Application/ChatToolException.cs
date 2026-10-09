namespace RescuePC.Portfolio.BuildingBlocks.Application;

/// <summary>A chat tool call that cannot be completed. The message is safe to hand back to the model.</summary>
public class ChatToolException : Exception
{
    public ChatToolException(string message) : base(message)
    {
    }

    public ChatToolException(string message, Exception innerException) : base(message, innerException)
    {
    }
}
