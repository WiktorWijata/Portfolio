using Portfolio.Notifications.Domain;
using Portfolio.Notifications.Domain.Repositories;

namespace Portfolio.Notifications.Persistence.Repositories;

public class EmailRepository : IEmailRepository
{
    private readonly NotificationDbContext _context;

    public EmailRepository(NotificationDbContext context)
    {
        _context = context;
    }

    public async Task PrepareEmailToSendAsync(Email email, CancellationToken cancellationToken = default)
    {
        await _context.Emails.AddAsync(email, cancellationToken);
    }
}
