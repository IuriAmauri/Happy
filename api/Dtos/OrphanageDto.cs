using System.Collections.Generic;

namespace api.Dtos
{
    public class OrphanageDto
    {
        public string Name { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

        public string About { get; set; }

        public string Instructions { get; set; }

        public bool OpenOnWeekends { get; set; }

        public string OpenningHours { get; set; }

        public IEnumerable<OrphanageImageDto> Images { get; set; }
    }
}