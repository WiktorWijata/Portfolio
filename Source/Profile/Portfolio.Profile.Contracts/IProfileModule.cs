using Portfolio.Profile.Contracts.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Portfolio.Profile.Contracts
{
    public interface IProfileModule
    { 
        Task<IEnumerable<LanguageDto>> GetLanguages(CancellationToken cancellationToken = default);
    }
}
