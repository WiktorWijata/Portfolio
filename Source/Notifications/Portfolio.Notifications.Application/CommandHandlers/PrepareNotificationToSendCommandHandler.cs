using Portfolio.Notifications.Application.Commands;
using Portfolio.Notifications.Domain.Repositories;
using Portfolio.Notifications.Domain;
using MediatR;

namespace Portfolio.Notifications.Application.CommandHandlers;

public class PrepareNotificationToSendCommandHandler : IRequestHandler<PrepareNotificationToSendCommand, Unit>
{
    private readonly IEmailRepository _emailRepository;

    public PrepareNotificationToSendCommandHandler(IEmailRepository emailRepository)
    {
        _emailRepository = emailRepository;
    }

    public async Task<Unit> Handle(PrepareNotificationToSendCommand request, CancellationToken cancellationToken)
    {
        await _emailRepository.PrepareEmailToSendAsync(
            new Email { 
                Name = request.Name, 
                Sender = request.Sender, 
                Body = request.Message 
            }, cancellationToken);

        return Unit.Value;
    }
}
