using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SoftwareEstimation.Plans
{
    [Table("AppPlans")]
    public class Plan : FullAuditedEntity<Guid>
    {
        
        public virtual string Title { get; protected set; }
        public virtual string Description { get; protected set;}
        
        public virtual float SEPoint { get; protected set; }
        public virtual float FPoint { get; protected set; }
        public virtual float UCPoint { get; protected set; }
        public virtual float UseCasePoint { get; protected set; }
        public virtual float EFPoint { get; protected set; }
        public virtual float TFPoint { get; protected set; }
        public virtual float UUCPoint { get; protected set; }
        public virtual bool isEvaluated { get; protected set; }


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
            return @plan;
        }

        public static Plan UpdatePlan(Guid planId, string title, string description, float uucp, float tfpoint, float efpoint, float ucp, long user, bool status)
        {
            var @plan = new Plan
            {
                Id = planId,
                Title = title,
                Description = description,
                UUCPoint = uucp,
                TFPoint = tfpoint,
                EFPoint = efpoint,
                UseCasePoint = ucp,
                CreatorUserId = user,
                isEvaluated = status
            };
            return plan;
        }
    }
}
