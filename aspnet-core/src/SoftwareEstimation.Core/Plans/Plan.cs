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
        public virtual long UserID { get; set; }
        public virtual string Title { get; set; }
        public virtual string Description { get; set;}
        public virtual float UUCPoint { get; set; }
        public virtual float TFPoint { get; set; }
        public virtual float UseCasePoint { get; set; }

        protected Plan()
        {

        }

        public virtual Plan Create (long userid, string title, string description)
        {
            var @plan = new Plan
            {
                UserID = userid,
                Title = title,
                Description = description
            };
            return @plan;
        }
    }
}
