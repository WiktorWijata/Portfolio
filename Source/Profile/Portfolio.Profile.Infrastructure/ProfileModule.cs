using Portfolio.Profile.Contracts;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Application.Queries;
using MediatR;

namespace Portfolio.Profile.Infrastructure;

public class ProfileModule : IProfileModule
{
    private readonly IMediator _mediator;

    public ProfileModule(IMediator mediator)
    {
        _mediator = mediator;
    }

    public Task<IEnumerable<LanguageDto>> GetLanguages(CancellationToken cancellationToken = default)
    {
        return _mediator.Send(new GetLanguagesQuery(), cancellationToken);
    }

    public Task<IntroductionDto> GetIntroduction(CancellationToken cancellationToken = default)
    {
        return _mediator.Send(new GetIntroductionQuery(), cancellationToken);
    }

    public Task<IEnumerable<ServiceDto>> GetServices(CancellationToken cancellationToken = default)
    {
        return _mediator.Send(new GetServicesQuery(), cancellationToken);
    }

    public Task<IEnumerable<SpecializationDto>> GetSpecializations(CancellationToken cancellationToken = default)
    {
        return _mediator.Send(new GetSpecializationsQuery(), cancellationToken);
    }

    public Task<IEnumerable<AspirationDto>> GetAspirations(CancellationToken cancellationToken = default)
    {
        return _mediator.Send(new GetAspirationsQuery(), cancellationToken);
    }

    public Task<IEnumerable<SkillCategoryDto>> GetSkills(CancellationToken cancellationToken = default)
    {
        return _mediator.Send(new GetSkillsQuery(), cancellationToken);
    }

    public Task<IEnumerable<ExperienceDto>> GetExperiences(CancellationToken cancellationToken = default)
    {
        return _mediator.Send(new GetExperiencesQuery(), cancellationToken);
    }

    public Task<IEnumerable<CertificateDto>> GetCertificates(CancellationToken cancellationToken = default)
    {
        return _mediator.Send(new GetCertificatesQuery(), cancellationToken);
    }

    public Task<IEnumerable<ProjectDto>> GetProjects(CancellationToken cancellationToken = default)
    {
        return _mediator.Send(new GetProjectsQuery(), cancellationToken);
    }

    public Task<IEnumerable<ContactDto>> GetContacts(CancellationToken cancellationToken = default)
    {
        return _mediator.Send(new GetContactsQuery(), cancellationToken);
    }

    public Task<BusinessDto> GetBusiness(CancellationToken cancellationToken = default)
    {
        return _mediator.Send(new GetBusinessQuery(), cancellationToken);
    }
}
