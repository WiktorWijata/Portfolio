using Portfolio.Profile.Application.Mappings;
using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;
using RescuePC.Portfolio.BuildingBlocks.Application;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetCertificatesQueryHandler : IRequestHandler<GetCertificatesQuery, IEnumerable<CertificateDto>>
{
    private readonly ICertificateRepository _certificateRepository;
    private readonly ICurrentTenant _currentTenant;

    public GetCertificatesQueryHandler(ICertificateRepository certificateRepository, ICurrentTenant currentTenant)
    {
        _certificateRepository = certificateRepository;
        _currentTenant = currentTenant;
    }

    public async Task<IEnumerable<CertificateDto>> Handle(GetCertificatesQuery request, CancellationToken cancellationToken)
    {
        var profileId = await _currentTenant.GetProfileIdAsync(cancellationToken);
        var certificates = await _certificateRepository.GetAllAsync(profileId, cancellationToken);

        return certificates.Select(c => c.ToDto()).ToArray();
    }
}
