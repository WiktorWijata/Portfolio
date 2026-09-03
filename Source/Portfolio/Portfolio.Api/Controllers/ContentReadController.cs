using Microsoft.AspNetCore.Mvc;
using Portfolio.Content.Contracts;
using RescuePC.Portfolio.Api.Contracts;
using RescuePC.Portfolio.Api.Contracts.Models;
using RescuePC.Portfolio.Api.Mappings;

namespace RescuePC.Portfolio.Api.Controllers;

[ApiController]
[Route("api/content-read")]
[Produces("application/json")]
public class ContentReadController : ControllerBase
{
    private readonly IContentModule _contentModule;

    public ContentReadController(IContentModule contentModule)
    {
        _contentModule = contentModule;
    }

    [HttpGet("languages")]
    [ProducesResponseType(typeof(Language[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetLanguages(CancellationToken cancellationToken = default)
    {
        var languages = await _contentModule.GetLanguages(cancellationToken);
        return Ok(languages.Select(x => new Language
        {
            Code = x.Code,
            Name = x.Name
        }));
    }

    [HttpGet("content")]
    [ProducesResponseType(typeof(ContentResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetContent(string languageCode, CancellationToken cancellationToken = default)
    {
        await Task.Delay(3000, cancellationToken);
        var content = await _contentModule.GetContentByLanguageCode(languageCode, cancellationToken);
        return Ok(content.ToResponse());
    }
}
