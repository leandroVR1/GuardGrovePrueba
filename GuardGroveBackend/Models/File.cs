namespace GuardGroveBackend
{
    public class File
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FilePath { get; set; }
        public int FolderId { get; set; }

        // Navigation properties
        public Folder Folder { get; set; }
    }


}