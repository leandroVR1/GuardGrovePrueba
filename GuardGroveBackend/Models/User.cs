namespace GuardGroveBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<Folder> Folders { get; set; } = new List<Folder>();
        public ICollection<UserFile> Files { get; set; } = new List<UserFile>();
    }
}
