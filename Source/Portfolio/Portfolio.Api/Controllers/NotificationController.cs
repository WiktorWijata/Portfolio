using Microsoft.AspNetCore.Mvc;
using Portfolio.Notifications.Contracts;
using RescuePC.Portfolio.Api.Contracts;
using RescuePC.Portfolio.Api.Mappings;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace RescuePC.Portfolio.Api.Controllers;

[ApiController]
[Route("api/notification")]
[Produces("application/json")]
public class NotificationController : ControllerBase
{
    private readonly INotificationsModule _notificationsModule;

    public NotificationController(INotificationsModule notificationsModule)
    {
        _notificationsModule = notificationsModule;
    }

    [HttpPost("send")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [RateLimit(permitLimit: 1, windowSeconds: 600)]
    public async Task<IActionResult> Send([FromBody] NotificationRequest request, CancellationToken cancellationToken = default)
    {
        await _notificationsModule.PrepareNotificationToSend(request.ToDto(), cancellationToken);
        return Ok();
    }
}
