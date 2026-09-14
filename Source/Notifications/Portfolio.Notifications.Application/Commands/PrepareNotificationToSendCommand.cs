using MediatR;

namespace Portfolio.Notifications.Application.Commands;

public class PrepareNotificationToSendCommand : IRequest<Unit>
{
    public PrepareNotificationToSendCommand(string name, string sender, string message)
    {
        Name = name;
        Sender = sender;
        Message = message;
    }

    public string Name { get; set; }

    public string Sender { get; set; }

    public string Message { get; set; }
}
