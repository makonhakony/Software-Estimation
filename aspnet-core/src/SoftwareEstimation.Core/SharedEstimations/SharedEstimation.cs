using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using SoftwareEstimation.Authorization.Users;
using SoftwareEstimation.Plans;

namespace SoftwareEstimation.SharedEstimations
{
    public class SharedEstimation : AuditedEntity
    {
        [ForeignKey("UserId")]
        public virtual User User { get; protected set; }
        public virtual long UserId { get; protected set; }
        [ForeignKey("EstimationId")]
        public virtual Plan Plans { get; protected set; }
        public virtual Guid EstimationId { get; set; }

        protected SharedEstimation()
        {

        }
    }

    
}
