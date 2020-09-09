using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using SoftwareEstimation.Projects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SoftwareEstimation.Plans
{
    public class Cocomo : CreationAuditedEntity, IMustHaveTenant
    {
        public virtual int TenantId { get; set; }
        //public virtual Plan Plan { get; set; }
        public virtual Guid PlanId { get; set; }

        [ForeignKey("ProjectId")]
        public virtual Project Projects { get; set; }
        public virtual Guid? ProjectId { get; set; }
        
        public virtual int Sloc { get; set; }

        public virtual int Mode { get; set; }
        public virtual int Model { get; set; }
        public virtual float Effort { get; set; }
        public virtual float Time { get; set; }
        public virtual int Staff { get; set; }

        protected Cocomo()
        {

        }

        public static Cocomo SetValue(Guid id, int sloc, int mode, int model, float effort, float time, int staff, Guid? projectId)
        {
            var ccm = new Cocomo
            {
                PlanId = id,
                Sloc = sloc,
                Mode = mode,
                Model = model,
                Effort = effort,
                Time = time,
                Staff = staff,
                ProjectId = projectId
            };
            
            return ccm;
        }
    }
}
