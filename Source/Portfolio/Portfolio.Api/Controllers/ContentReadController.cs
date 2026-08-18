using Microsoft.AspNetCore.Mvc;
using Porfolio.Content.Contracts;
using Portfolio.Content.Contracts.Models;
using RescuePC.Portfolio.Api.Contracts;

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

    [HttpGet("content")]
    [ProducesResponseType(typeof(ContentDto), StatusCodes.Status200OK)]
    public IActionResult GetContent(string languageCode)
    {
        return Ok(new ContentDto());
    }

    [HttpGet("languages")]
    [ProducesResponseType(typeof(IEnumerable<LanguageDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetLanguages(CancellationToken cancellationToken = default)
    {
        var languages = await _contentModule.GetLanguages(cancellationToken);
        return Ok(languages);
    }
}
