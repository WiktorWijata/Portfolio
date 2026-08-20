using Microsoft.AspNetCore.Mvc;
using Portfolio.Content.Contracts;
using Portfolio.Content.Contracts.Models;

namespace RescuePC.Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentReadController : ControllerBase
{
    private readonly IContentModule _contentModule;

    public ContentReadController(IContentModule contentModule)
    {
        _contentModule = contentModule;
    }

    [HttpGet("languages")]
    [ProducesResponseType(typeof(IEnumerable<LanguageDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetLanguages(CancellationToken cancellationToken = default)
    {
        var languages = await _contentModule.GetLanguages(cancellationToken);
        return Ok(languages);
    }

    [HttpGet("content")]
    [ProducesResponseType(typeof(ContentDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetContent(string languageCode, CancellationToken cancellationToken = default)
    {
        var content = await _contentModule.GetContentByLanguageCode(languageCode, cancellationToken);
        return Ok(content);
    }
}
