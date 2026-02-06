using System.Collections.Generic;

namespace RescuePC.Portfolio.Api.Contracts
{
    public class SkillCategoryDto
    {
        public string Name { get; set; }
        public IEnumerable<SkillDto> Skills { get; set; }
    }
}
