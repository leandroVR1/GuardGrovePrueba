// Repositories/FolderRepository.cs
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GuardGroveBackend.Data;
using GuardGroveBackend.Models;
using GuardGroveBackend.Models.Dtos;

namespace GuardGroveBackend.Repositories
{
    public class FolderRepository : IFolderRepository
    {
        private readonly BaseContext _context;

        public FolderRepository(BaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Folder>> GetAllFoldersAsync()
        {
            return await _context.Folders.ToListAsync();
        }

        public async Task<IEnumerable<Models.File>> GetAllFilesAsync()
        {
            return await _context.Files.ToListAsync();
        }

        public async Task<List<FolderDto>> GetSubfoldersAsync(int folderId)
        {
            return await _context.Folders
                .Where(f => f.ParentId == folderId)
                .Select(f => new FolderDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    ParentId = f.ParentId
                }).ToListAsync();
        }

        public async Task<List<FileDto>> GetFilesInFolderAsync(int folderId)
        {
            return await _context.Files
                .Where(f => f.FolderId == folderId)
                .Select(f => new FileDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    FilePath = f.FilePath
                }).ToListAsync();
        }
    }
}
