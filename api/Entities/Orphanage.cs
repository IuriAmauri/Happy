using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
    public class Orphanage
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Latitude { get; set; }

        [Required]
        public decimal Longitude { get; set; }

        [Required]
        [MaxLength(300)]
        public string About { get; set; }
        
        public string Instructions { get; set; }

        public bool OpenOnWeekends { get; set; }

        public string OpenningHours { get; set; }

        public IEnumerable<OrphanageImage> Images { get; set; }
    }
}