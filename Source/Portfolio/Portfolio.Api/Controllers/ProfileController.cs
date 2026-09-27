using Microsoft.AspNetCore.Mvc;
using Portfolio.Profile.Contracts;
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

    [HttpGet("introduction")]
    [ProducesResponseType(typeof(Introduction), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetIntroduction(CancellationToken cancellationToken = default)
    {
        var introduction = await _profileModule.GetIntroduction(cancellationToken);
        return Ok(introduction.ToResponse());
    }

    [HttpGet("services")]
    [ProducesResponseType(typeof(Service[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetServices(CancellationToken cancellationToken = default)
    {
        var services = await _profileModule.GetServices(cancellationToken);
        return Ok(services.Select(s => s.ToResponse()));
    }

    [HttpGet("specializations")]
    [ProducesResponseType(typeof(Specialization[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSpecializations(CancellationToken cancellationToken = default)
    {
        var specializations = await _profileModule.GetSpecializations(cancellationToken);
        return Ok(specializations.Select(s => s.ToResponse()));
    }

    [HttpGet("aspirations")]
    [ProducesResponseType(typeof(Aspiration[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAspirations(CancellationToken cancellationToken = default)
    {
        var aspirations = await _profileModule.GetAspirations(cancellationToken);
        return Ok(aspirations.Select(a => a.ToResponse()));
    }

    [HttpGet("skills")]
    [ProducesResponseType(typeof(SkillCategory[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSkills(CancellationToken cancellationToken = default)
    {
        var skillCategories = await _profileModule.GetSkills(cancellationToken);
        return Ok(skillCategories.Select(s => s.ToResponse()));
    }

    [HttpGet("experiences")]
    [ProducesResponseType(typeof(Experience[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetExperiences(CancellationToken cancellationToken = default)
    {
        var experiences = await _profileModule.GetExperiences(cancellationToken);
        return Ok(experiences.Select(e => e.ToResponse()));
    }

    [HttpGet("certificates")]
    [ProducesResponseType(typeof(Certificate[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCertificates(CancellationToken cancellationToken = default)
    {
        var certificates = await _profileModule.GetCertificates(cancellationToken);
        return Ok(certificates.Select(c => c.ToResponse()));
    }

    [HttpGet("projects")]
    [ProducesResponseType(typeof(Project[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProjects(CancellationToken cancellationToken = default)
    {
        var projects = await _profileModule.GetProjects(cancellationToken);
        return Ok(projects.Select(p => p.ToResponse()));
    }

    [HttpGet("contacts")]
    [ProducesResponseType(typeof(Contact[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetContacts(CancellationToken cancellationToken = default)
    {
        var contacts = await _profileModule.GetContacts(cancellationToken);
        return Ok(contacts.Select(c => c.ToResponse()));
    }

    [HttpGet("business")]
    [ProducesResponseType(typeof(Business), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetBusiness(CancellationToken cancellationToken = default)
    {
        var business = await _profileModule.GetBusiness(cancellationToken);
        return Ok(business.ToResponse());
    }
}
