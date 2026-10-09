using Portfolio.Profile.Application.Mappings;
using Portfolio.Profile.Application.Queries;
using Portfolio.Profile.Contracts.Models;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;
using RescuePC.Portfolio.BuildingBlocks.Application;
using MediatR;

namespace Portfolio.Profile.Application.QueryHandlers;

public class GetSkillsQueryHandler : IRequestHandler<GetSkillsQuery, IEnumerable<SkillCategoryDto>>
{
    private readonly ISkillRepository _skillRepository;
    private readonly ISkillCategoryRepository _skillCategoryRepository;
    private readonly ITechnologyRepository _technologyRepository;
    private readonly ICurrentTenant _currentTenant;
    private readonly ICallerContext _callerContext;

    public GetSkillsQueryHandler(
        ISkillRepository skillRepository,
        ISkillCategoryRepository skillCategoryRepository,
        ITechnologyRepository technologyRepository,
        ICurrentTenant currentTenant,
        ICallerContext callerContext)
    {
        _skillRepository = skillRepository;
        _skillCategoryRepository = skillCategoryRepository;
        _technologyRepository = technologyRepository;
        _currentTenant = currentTenant;
        _callerContext = callerContext;
    }

    public async Task<IEnumerable<SkillCategoryDto>> Handle(GetSkillsQuery request, CancellationToken cancellationToken)
    {
        var profileId = await _currentTenant.GetProfileIdAsync(cancellationToken);
        var skills = (await _skillRepository.GetAllAsync(profileId, cancellationToken)).ToArray();
        var categories = await _skillCategoryRepository.GetAllAsync(cancellationToken);
        var technologies = await _technologyRepository.GetByIdsAsync(skills.Select(s => s.TechnologyId), cancellationToken);
        var languageCode = _callerContext.GetLanguageCode();
        var skillsByCategory = skills.ToLookup(s => s.SkillCategoryId);

        // Only categories that actually have a skill for this profile are shown.
        return categories
            .Where(category => skillsByCategory.Contains(category.Id))
            .SelectTranslated(c => c.GetTranslation(languageCode))
            .Select(x =>
            {
                var technologyDtos = skillsByCategory[x.Entity.Id]
                    .OrderBy(s => s.Order)
                    .Select(s => technologies[s.TechnologyId].ToDto())
                    .ToArray();

                return x.Translation.ToDto(technologyDtos);
            })
            .ToArray();
    }
}
