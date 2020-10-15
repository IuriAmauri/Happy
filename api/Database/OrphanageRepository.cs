using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Database
{
    public class OrphanageRepository : IOrphanageRepository
    {
        private readonly HappyDbContext _dbContext;
        public OrphanageRepository(HappyDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<IEnumerable<Orphanage>> GetAllOrphanages()
        {
            IQueryable<Orphanage> query = _dbContext.Orphanages.Include(c => c.Images);
            query = query.OrderByDescending(o => o.Id);

            return await query.ToListAsync();
        }

        public async Task<Orphanage> GetOrphanageById(int id)
        {
            IQueryable<Orphanage> query = _dbContext.Orphanages.Include(c => c.Images);
            return await query.FirstOrDefaultAsync(w => w.Id == id);
        }

        public Orphanage CreateOrphanage(Orphanage orphanage)
        {
            return _dbContext.Orphanages.Add(orphanage).Entity;
        }

        public Orphanage UpdateOrphanage(Orphanage orphanage)
        {
            return _dbContext.Orphanages.Update(orphanage).Entity;
        }

        public void DeleteOrphanage(Orphanage orphanage)
        {
            _dbContext.Orphanages.Remove(orphanage);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _dbContext.SaveChangesAsync()> 0);
        }

        public void CreateImage(OrphanageImage image)
        {
            _dbContext.Images.Add(image);
        }
    }
}