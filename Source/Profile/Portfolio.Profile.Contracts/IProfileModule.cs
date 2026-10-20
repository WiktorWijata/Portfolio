using Portfolio.Profile.Contracts.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Portfolio.Profile.Contracts
{
    public interface IProfileModule
    {
        Task<IEnumerable<LanguageDto>> GetLanguages(CancellationToken cancellationToken = default);

        // The active language is resolved from the request (Accept-Language header),
        // not passed as a parameter here — see feedback_language_via_header.

        Task<IntroductionDto> GetIntroduction(CancellationToken cancellationToken = default);
        Task<IEnumerable<ServiceDto>> GetServices(CancellationToken cancellationToken = default);
        Task<IEnumerable<SpecializationDto>> GetSpecializations(CancellationToken cancellationToken = default);
        Task<IEnumerable<AspirationDto>> GetAspirations(CancellationToken cancellationToken = default);
        Task<IEnumerable<SkillCategoryDto>> GetSkills(CancellationToken cancellationToken = default);
        Task<IEnumerable<ExperienceDto>> GetExperiences(CancellationToken cancellationToken = default);
        Task<IEnumerable<CertificateDto>> GetCertificates(CancellationToken cancellationToken = default);
        Task<IEnumerable<ProjectDto>> GetProjects(CancellationToken cancellationToken = default);
        Task<IEnumerable<ContactDto>> GetContacts(CancellationToken cancellationToken = default);
        Task<BusinessDto> GetBusiness(CancellationToken cancellationToken = default);
    }
}
