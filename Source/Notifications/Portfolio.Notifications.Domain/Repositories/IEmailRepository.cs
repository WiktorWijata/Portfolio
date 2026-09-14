namespace Portfolio.Notifications.Domain.Repositories;

public interface IEmailRepository
{
    Task PrepareEmailToSendAsync(Email email, CancellationToken cancellationToken = default);
}
