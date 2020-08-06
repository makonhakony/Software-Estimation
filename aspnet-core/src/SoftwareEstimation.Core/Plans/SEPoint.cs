using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans
{
    public class SEPoint : CreationAuditedEntity
    {
        //public virtual Plan Plan { get; set; }
        public virtual Guid PlanId { get; set; }

        public virtual int Sloc { get; set; }
        public virtual int Mode { get; set; }
        public virtual int Model { get; set; }
        public virtual float Effort { get; set; }
        public virtual float Time { get; set; }
        public virtual int Staff { get; set; }

        protected SEPoint()
        {

        }

        public static SEPoint SetValue(Guid id, int sloc, int mode, int model, float effort, float time, int staff)
        {
            var @sep = new SEPoint
            {
                PlanId = id,
                Sloc = sloc,
                Mode = mode,
                Model = model,
                Effort = effort,
                Time = time,
                Staff = staff
            };
            
            return @sep;
        }

    }
}
