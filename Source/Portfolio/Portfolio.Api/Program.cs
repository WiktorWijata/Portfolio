using Hangfire;
using Portfolio.Content.Infrastructure;
using Portfolio.Notifications.Infrastructure;
using RescuePC.Portfolio.Api.Middleware;
using RescuePC.Software.Logging.Providers.Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.AddSerilog();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRateLimiting(builder.Configuration);
builder.Services.AddHangfireJobs(builder.Configuration);

const string ClientAppCorsPolicy = "ClientApp";

builder.Services.AddCors(options =>
{
    options.AddPolicy(ClientAppCorsPolicy, policy =>
    {
        policy.WithOrigins("https://localhost:5001")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var connectionString = builder.Configuration.GetConnectionString("Portfolio");
builder.Services.AddContent(connectionString!);
builder.Services.AddNotifications(connectionString!);

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
app.Run();
