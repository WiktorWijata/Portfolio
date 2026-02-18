var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// Configure static files middleware with proper caching
var staticFileOptions = new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        // Cache static assets for 1 year (immutable files with hash in name)
        if (ctx.Context.Request.Path.StartsWithSegments("/assets"))
        {
            ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=31536000,immutable");
        }
        // Cache other static files for 1 hour
        else
        {
            ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=3600");
        }
    }
};

app.UseStaticFiles(staticFileOptions);

app.MapFallbackToFile("index.html");

app.Run();
