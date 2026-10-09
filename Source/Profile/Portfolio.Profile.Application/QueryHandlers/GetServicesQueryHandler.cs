using Portfolio.Profile.Application.Mappings;
using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;
using RescuePC.Portfolio.BuildingBlocks.Application;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetServicesQueryHandler : IRequestHandler<GetServicesQuery, IEnumerable<ServiceDto>>
{
    private readonly IServiceRepository _serviceRepository;
    private readonly ICurrentTenant _currentTenant;
    private readonly ICallerContext _callerContext;

    public GetServicesQueryHandler(IServiceRepository serviceRepository, ICurrentTenant currentTenant, ICallerContext callerContext)
    {
        _serviceRepository = serviceRepository;
        _currentTenant = currentTenant;
        _callerContext = callerContext;
    }

    public async Task<IEnumerable<ServiceDto>> Handle(GetServicesQuery request, CancellationToken cancellationToken)
    {
        var profileId = await _currentTenant.GetProfileIdAsync(cancellationToken);
        var services = await _serviceRepository.GetAllAsync(profileId, cancellationToken);
        var languageCode = _callerContext.GetLanguageCode();

        return services
            .SelectTranslated(s => s.GetTranslation(languageCode))
            .Select(x => x.Entity.ToDto(x.Translation))
            .ToArray();
    }
}
