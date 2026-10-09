using Hangfire;
using Portfolio.Chat.Infrastructure;
using Portfolio.Profile.Infrastructure;
using Portfolio.Notifications.Infrastructure;
using RescuePC.Portfolio.Api.Middleware;
using RescuePC.Portfolio.BuildingBlocks.Application;
using RescuePC.Software.Logging.Providers.Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.AddSerilog();

builder.Services.AddControllers();
builder.Services.AddChat(typeof(Program).Assembly);
builder.Services.AddIntegratorAIClient(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRateLimiting(builder.Configuration);
builder.Services.AddHangfireJobs(builder.Configuration);
builder.Services.AddCallerContext();

const string ClientAppCorsPolicy = "ClientApp";

var corsAllowedOrigin = builder.Configuration["Cors:AllowedOrigin"]
    ?? throw new InvalidOperationException("Cors:AllowedOrigin configuration value is not set.");

builder.Services.AddCors(options =>
{
    options.AddPolicy(ClientAppCorsPolicy, policy =>
    {
        policy.WithOrigins(corsAllowedOrigin)
            .AllowAnyHeader()
            .AllowAnyMethod()
            // A browser may read a response header from another origin only if it is exposed; the chat id travels in one.
            .WithExposedHeaders("Completion-Id");
    });
});

var connectionString = builder.Configuration.GetConnectionString("Portfolio");
builder.Services.AddProfile(connectionString!);
builder.Services.AddNotifications(connectionString!);
builder.Services.AddDatabaseHealthCheck(connectionString!);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHangfireDashboard();
}

app.UseHttpsRedirection();

app.UsePathBase("/api");

app.UseRouting();

app.UseCors(ClientAppCorsPolicy);
app.UseRateLimiter();
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health").DisableRateLimiting();
app.Services.ScheduleChatContextSync();
app.Run();
