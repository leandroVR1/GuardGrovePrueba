namespace GuardGroveBackend{

public class Folder
{
     public int Id { get; set; }
    public string Name { get; set; }
    public int UserId { get; set; }
    
    // Navigation properties
    public User User { get; set; }
    public ICollection<File> Files { get; set; }
}
}