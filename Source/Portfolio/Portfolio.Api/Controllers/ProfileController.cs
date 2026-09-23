using Microsoft.AspNetCore.Mvc;
using Portfolio.Profile.Contracts;
using RescuePC.Portfolio.Api.Contracts;
using RescuePC.Portfolio.Api.Contracts.Models;
using RescuePC.Portfolio.Api.Mappings;

namespace RescuePC.Portfolio.Api.Controllers;

[ApiController]
[Route("profile")]
[Produces("application/json")]
public class ProfileController : ControllerBase
{
    private readonly IProfileModule _profileModule;

    public ProfileController(IProfileModule profileModule)
    {
        _profileModule = profileModule;
    }

    [HttpGet("languages")]
    [ProducesResponseType(typeof(Language[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetLanguages(CancellationToken cancellationToken = default)
    {
        var languages = await _profileModule.GetLanguages(cancellationToken);
        return Ok(languages.Select(x => new Language
        {
            Code = x.Code,
            Name = x.Name
        }));
    }

    [HttpGet]
    [ProducesResponseType(typeof(ProfileResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProfile(string languageCode, CancellationToken cancellationToken = default)
    {
        var profile = await _profileModule.GetProfileByLanguageCode(languageCode, cancellationToken);
        return Ok(profile.ToResponse());
    }
}
