using Portfolio.Notifications.Contracts;
using Portfolio.Notifications.Contracts.Models;
using Portfolio.Notifications.Application.Commands;
using MediatR;

namespace Portfolio.Notifications.Infrastructure;

public class NotificationsModule : INotificationsModule
{
    private readonly IMediator _mediator;
    public NotificationsModule(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task PrepareNotificationToSend(NotificationDto notification, CancellationToken cancelationToken = default) =>
        await _mediator.Send(new PrepareNotificationToSendCommand(notification.Name, notification.Sender, notification.Message), cancelationToken);
    
}
