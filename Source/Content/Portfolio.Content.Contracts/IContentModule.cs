using Portfolio.Content.Contracts.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Porfolio.Content.Contracts
{
    public interface IContentModule
    { 
        Task<IEnumerable<LanguageDto>> GetLanguages(CancellationToken cancellationToken = default);
    }
}
