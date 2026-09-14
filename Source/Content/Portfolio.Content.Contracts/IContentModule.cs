using Portfolio.Content.Contracts.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Portfolio.Content.Contracts
{
    public interface IContentModule
    { 
        Task<IEnumerable<LanguageDto>> GetLanguages(CancellationToken cancellationToken = default);
        Task<ContentDto> GetContentByLanguageCode(string languageCode, CancellationToken cancellationToken = default);
    }
}
