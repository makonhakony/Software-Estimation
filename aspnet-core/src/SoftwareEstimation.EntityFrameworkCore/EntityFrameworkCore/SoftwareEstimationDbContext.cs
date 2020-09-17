using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using SoftwareEstimation.Authorization.Roles;
using SoftwareEstimation.Authorization.Users;
using SoftwareEstimation.MultiTenancy;
using SoftwareEstimation.Projects;
using SoftwareEstimation.Plans;
using SoftwareEstimation.SharedEstimations;

namespace SoftwareEstimation.EntityFrameworkCore
{
    public class SoftwareEstimationDbContext : AbpZeroDbContext<Tenant, Role, User, SoftwareEstimationDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<Plan> Plans { get; set; }
        public virtual DbSet<UCPoint> UCPoints { get; set; }
        public virtual DbSet<Cocomo> Cocomos { get; set; }
        public virtual DbSet<FPoint> FPoints { get; set; }
        public virtual DbSet<HistoEstimation> HistoEstimations { get; set; }
        public virtual DbSet<SharedEstimation> SharedEstimations { get; set; }
        public SoftwareEstimationDbContext(DbContextOptions<SoftwareEstimationDbContext> options)
            : base(options)
        {
        }
    }
}
