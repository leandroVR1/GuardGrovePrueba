// Repositories/IFolderRepository.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using GuardGroveBackend.Models;
using GuardGroveBackend.Models.Dtos;

namespace GuardGroveBackend.Repositories
{
    public interface IFolderRepository
    {
        Task<IEnumerable<Folder>> GetAllFoldersAsync();
        Task<IEnumerable<Models.File>> GetAllFilesAsync();
        Task<List<FolderDto>> GetSubfoldersAsync(int folderId);
        Task<List<FileDto>> GetFilesInFolderAsync(int folderId);
    }
}
