using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GuardGroveBackend.Repositories;

namespace GuardGroveBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoldersController : ControllerBase
    {
        private readonly IFolderRepository _folderRepository;

        public FoldersController(IFolderRepository folderRepository)
        {
            _folderRepository = folderRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetFoldersAndFiles()
        {
            var folders = await _folderRepository.GetAllFoldersAsync();
            var files = await _folderRepository.GetAllFilesAsync();

            var result = new
            {
                folders,
                files
            };

            return Ok(result);
        }
    }
}
