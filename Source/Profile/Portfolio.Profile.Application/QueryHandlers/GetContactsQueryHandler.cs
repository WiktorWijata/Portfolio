using Portfolio.Profile.Application.Mappings;
using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;
using RescuePC.Portfolio.BuildingBlocks.Application;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetContactsQueryHandler : IRequestHandler<GetContactsQuery, IEnumerable<ContactDto>>
{
    private readonly IContactRepository _contactRepository;
    private readonly ICurrentTenant _currentTenant;

    public GetContactsQueryHandler(IContactRepository contactRepository, ICurrentTenant currentTenant)
    {
        _contactRepository = contactRepository;
        _currentTenant = currentTenant;
    }

    public async Task<IEnumerable<ContactDto>> Handle(GetContactsQuery request, CancellationToken cancellationToken)
    {
        var profileId = await _currentTenant.GetProfileIdAsync(cancellationToken);
        var contacts = await _contactRepository.GetAllAsync(profileId, cancellationToken);

        return contacts.Select(c => c.ToDto()).ToArray();
    }
}
