var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// index.html never cached – browser always fetches fresh copy after deploy
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/" ||
        context.Request.Path.Value?.EndsWith(".html", StringComparison.OrdinalIgnoreCase) == true)
    {
        context.Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
        context.Response.Headers["Pragma"] = "no-cache";
        context.Response.Headers["Expires"] = "0";
    }
    await next();
});

// Static assets with content hash in filename → cache 1 year
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        if (ctx.Context.Request.Path.StartsWithSegments("/assets"))
            ctx.Context.Response.Headers["Cache-Control"] = "public,max-age=31536000,immutable";
    }
});

app.MapFallbackToFile("index.html");

app.Run();
