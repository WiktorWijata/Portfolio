using System.Threading;
using System.Threading.Tasks;
using Portfolio.Notifications.Contracts.Models;

namespace Portfolio.Notifications.Contracts
{
    public interface INotificationsModule
    {
        Task PrepareNotificationToSend(NotificationDto notification, CancellationToken cancelationToken = default);
    }
}
