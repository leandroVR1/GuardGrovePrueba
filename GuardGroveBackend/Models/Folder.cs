
namespace GuardGroveBackend.Models
{
    public class Folder
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public int? ParentId { get; set; }
        public DateTime CreatedAt { get; set; }

        public User User { get; set; }
        public Folder Parent { get; set; }
        public ICollection<Folder> Children { get; set; } = new List<Folder>();
        public ICollection<UserFile> Files { get; set; } = new List<UserFile>();
    }
}
