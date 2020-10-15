using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;

namespace api.Database
{
    public interface IOrphanageRepository
    {
        Task<bool> SaveChangesAsync();
        Task<IEnumerable<Orphanage>> GetAllOrphanages();
        Task<Orphanage> GetOrphanageById(int Id);
        Orphanage CreateOrphanage(Orphanage orphanage);
        Orphanage UpdateOrphanage(Orphanage orphanage);
        void DeleteOrphanage(Orphanage orphanage);
        void CreateImage(OrphanageImage image);
    }
}