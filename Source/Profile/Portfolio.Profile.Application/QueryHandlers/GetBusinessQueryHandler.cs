using Portfolio.Profile.Application.Mappings;
using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;
using RescuePC.Portfolio.BuildingBlocks.Application;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetBusinessQueryHandler : IRequestHandler<GetBusinessQuery, BusinessDto>
{
    private readonly IBusinessRepository _businessRepository;
    private readonly ICurrentTenant _currentTenant;

    public GetBusinessQueryHandler(IBusinessRepository businessRepository, ICurrentTenant currentTenant)
    {
        _businessRepository = businessRepository;
        _currentTenant = currentTenant;
    }

    public async Task<BusinessDto> Handle(GetBusinessQuery request, CancellationToken cancellationToken)
    {
        var profileId = await _currentTenant.GetProfileIdAsync(cancellationToken);
        var business = await _businessRepository.GetAsync(profileId, cancellationToken)
            ?? throw new InvalidOperationException($"Profile {profileId} has no Business.");

        return business.ToDto();
    }
}
