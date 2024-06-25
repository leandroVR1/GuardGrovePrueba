namespace GuardGroveBackend.Models
{
    public class File
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FolderId { get; set; }
        public string FilePath { get; set; }
        public DateTime CreatedAt { get; set; }
        public Folder Folder { get; set; }
    }


}