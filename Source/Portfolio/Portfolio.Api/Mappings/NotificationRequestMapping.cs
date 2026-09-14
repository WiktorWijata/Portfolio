using Portfolio.Notifications.Contracts.Models;
using RescuePC.Portfolio.Api.Contracts;

namespace RescuePC.Portfolio.Api.Mappings;

public static class NotificationRequestMapping
{
    extension(NotificationRequest request)
    {
        public NotificationDto ToDto()
        {
            return new NotificationDto
            {
                Name = request.Name,
                Sender = request.Sender,
                Message = request.Message
            };
        }
    }
}
