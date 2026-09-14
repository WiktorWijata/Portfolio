using Microsoft.EntityFrameworkCore;
using Portfolio.Notifications.Application;
using Portfolio.Notifications.Domain;

namespace Portfolio.Notifications.Persistence;

public class NotificationDbContext : EfContext, INotificationUnitOfWork
{
    protected override string DefaultSchema => "notification";

    public NotificationDbContext(DbContextOptions<NotificationDbContext> options) : base(options) { }

    internal DbSet<Email> Emails { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
