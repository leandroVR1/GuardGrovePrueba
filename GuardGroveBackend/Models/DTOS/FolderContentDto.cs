namespace GuardGroveBackend.Models.Dtos{
public class FolderContentDto
{
    public List<FolderDto> Folders { get; set; }
    public List<FileDto> Files { get; set; }
}
}