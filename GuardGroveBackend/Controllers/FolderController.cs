using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using GuardGroveBackend.Methods;
using GuardGroveBackend.Models.Dtos;
using GuardGroveBackend.Repositories;

namespace GuardGroveBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoldersController : ControllerBase
    {
        private readonly IFolderRepository _folderRepository;
        private readonly FolderGet _folderGet;

        public FoldersController(IFolderRepository folderRepository, FolderGet folderGet)
        {
            _folderRepository = folderRepository;
            _folderGet = folderGet;
        }

        [HttpGet]
        public async Task<IActionResult> GetFoldersAndFiles()
        {
            var folders = await _folderRepository.GetAllFoldersAsync();

            var result = folders.Select(f => new
            {
                f.Id,
                f.Name,
                f.ParentId,
                f.UserId,
                f.CreatedAt,
                Files = f.Files?.Select(file => new
                {
                    file.Id,
                    file.Name,
                    file.FilePath,
                    file.CreatedAt
                })
            });

            return Ok(result);
        }

        [HttpGet("{id}/content")]
        public async Task<ActionResult<FolderContentDto>> GetFolderContent(int id)
        {
            var folderContent = await _folderGet.GetFolderContentAsync(id);
            if (folderContent == null)
            {
                return NotFound();
            }
            return Ok(folderContent);
        }
    }
}
