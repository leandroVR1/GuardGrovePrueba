namespace GuardGroveBackend{
    [ApiController]
[Route("api/[controller]")]
public class FoldersController : ControllerBase
{
    private readonly IRepository _repository;

    public FoldersController(IRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetFoldersAndFiles()
    {
        var folders = await _repository.GetAllFoldersAsync();
        var files = await _repository.GetAllFilesAsync();

        var result = new
        {
            folders,
            files
        };

        return Ok(result);
    }
}

}