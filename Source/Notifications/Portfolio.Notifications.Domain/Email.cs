namespace Portfolio.Notifications.Domain
{
    public class Email
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Sender { get; set; }
        public required string Body { get; set; }
        public DateTime? SentDate { get; set; }
        public DateTime CreatedAt { get; set; }

        public Email()
        {
            CreatedAt = DateTime.UtcNow;
        }
    }
}
