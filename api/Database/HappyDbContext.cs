using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Database
{
    public class HappyDbContext : DbContext
    {
        public HappyDbContext(DbContextOptions<HappyDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Orphanage>()
                .Property(o => o.Latitude).HasColumnType("decimal(10,7)");
            
            modelBuilder.Entity<Orphanage>()
                .Property(o => o.Longitude).HasColumnType("decimal(10,7)");
        }
        
        public DbSet<Orphanage> Orphanages { get; set; }
        public DbSet<OrphanageImage> Images { get; set; }
    }
}