using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareEstimation.Plans
{
    [Table("AppPlans")]
    public class Plan : FullAuditedEntity<Guid>, IMustHaveTenant
    {
        public virtual int TenantId { get; set; }
        public virtual string Title { get; protected set; }
        public virtual string Description { get; protected set;}
        
        //public virtual float SEPoint { get; protected set; }
        

        [ForeignKey("PlanId")]
        public virtual IList<UCPoint> UCP { get; set; }
        public virtual UCPoint UcpLatest { get; set; }

        [ForeignKey("PlanId")]
        public virtual IList<SEPoint> SEP { get; set; }
        public virtual SEPoint SepLatest { get; set; }

        [ForeignKey("PlanId")]
        public virtual IList<FPoint> FP { get; set; }
        public virtual FPoint FpLatest { get; set; }


        protected Plan()
        {

        }

        public static Plan CreatePlan (string title, string description)
        {
            var @plan = new Plan
            {
                Title = title,
                Description = description
            };
            @plan.UCP = new List<UCPoint>();
            @plan.SEP = new List<SEPoint>();
            @plan.FP = new List<FPoint>();
            return @plan;
        }
        
        //public static Plan UpdatePlan(Guid planId, string title, string description, float ucp, float fp, long user)
        //{
        //    var @plan = new Plan
        //    {
        //        Id = planId,
        //        Title = title,
        //        Description = description,
        //        FPoint = fp,
        //        UCP = ucp,

        //        CreatorUserId = user,

        //    };

        //    @plan.SEP = new List<SEPoint>();
        //    return @plan;
        //}
    }
}
