using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
    public class OrphanageImage
    {
        public int Id { get; set; }

        [Required]
        public string Path { get; set; }
        
        public int OrphanageId { get; set; }
    }
}