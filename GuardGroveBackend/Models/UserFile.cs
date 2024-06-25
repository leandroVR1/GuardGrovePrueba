namespace GuardGroveBackend.Models
{
    public class UserFile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FolderId { get; set; }
        public int UserId { get; set; }
        public string FilePath { get; set; }
        public DateTime CreatedAt { get; set; }

        public Folder Folder { get; set; }
        public User User { get; set; }
    }
}
