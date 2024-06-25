using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GuardGroveBackend.Models;
using GuardGroveBackend.Data;

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
    }
}
