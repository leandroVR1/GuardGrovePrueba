// Methods/FolderGet.cs
using System.Threading.Tasks;
using GuardGroveBackend.Models.Dtos;
using GuardGroveBackend.Repositories;

namespace GuardGroveBackend.Methods
{
    public interface IFolderGet
    {
        Task<FolderContentDto> GetFolderContentAsync(int folderId);
    }

    public class FolderGet : IFolderGet
    {
        private readonly IFolderRepository _folderRepository;

        public FolderGet(IFolderRepository folderRepository)
        {
            _folderRepository = folderRepository;
        }

        public async Task<FolderContentDto> GetFolderContentAsync(int folderId)
        {
            var folderContent = new FolderContentDto
            {
                Folders = await _folderRepository.GetSubfoldersAsync(folderId),
                Files = await _folderRepository.GetFilesInFolderAsync(folderId)
            };
            return folderContent;
        }
    }
}
