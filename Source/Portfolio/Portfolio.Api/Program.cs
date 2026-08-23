using Portfolio.Content.Infrastructure;
using RescuePC.Software.Logging.Providers.Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.AddSerilog();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(ClientAppCorsPolicy);
app.UseAuthorization();
app.MapControllers();
app.Run();
