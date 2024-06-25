using System.Collections.Generic;
using System.Threading.Tasks;
using GuardGroveBackend.Models;

namespace GuardGroveBackend.Repositories
{
    public interface IFolderRepository
    {
        Task<IEnumerable<Folder>> GetAllFoldersAsync();
        Task<IEnumerable<Models.File>> GetAllFilesAsync();
        
    }
}
