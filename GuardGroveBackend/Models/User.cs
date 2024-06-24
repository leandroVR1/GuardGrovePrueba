namespace GuardGroveBackend{

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    
    // Navigation properties
    public ICollection<Folder> Folders { get; set; }
}
}