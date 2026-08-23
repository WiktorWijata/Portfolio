using Portfolio.Content.Infrastructure;
using RescuePC.Software.Logging.Providers.Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.AddSerilog();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("Portfolio");
builder.Services.AddContent(connectionString!);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
