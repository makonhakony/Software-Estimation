
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans
{
    public class FPoint : CreationAuditedEntity, IMustHaveTenant
    {
        public virtual int TenantId { get; set; }
        public virtual Guid PlanId { get; set; }
        public virtual float FP { get; set; }
        public virtual float UFP { get; set; }
        public virtual float CAF { get; set; }

        public virtual int u11 { get; set; }
        public virtual int u12 { get; set; }
        public virtual int u13 { get; set; }
        public virtual int u21 { get; set; }
        public virtual int u22 { get; set; }
        public virtual int u23 { get; set; }
        public virtual int u31 { get; set; }
        public virtual int u32 { get; set; }
        public virtual int u33 { get; set; }
        public virtual int u41 { get; set; }
        public virtual int u42 { get; set; }
        public virtual int u43 { get; set; }
        public virtual int u51 { get; set; }
        public virtual int u52 { get; set; }
        public virtual int u53 { get; set; }

        public virtual int c1 { get; set; }
        public virtual int c2 { get; set; }
        public virtual int c3 { get; set; }
        public virtual int c4 { get; set; }
        public virtual int c5 { get; set; }
        public virtual int c6 { get; set; }
        public virtual int c7 { get; set; }
        public virtual int c8 { get; set; }
        public virtual int c9 { get; set; }
        public virtual int c10 { get; set; }
        public virtual int c11 { get; set; }
        public virtual int c12 { get; set; }
        public virtual int c13 { get; set; }
        public virtual int c14 { get; set; }

        public virtual float Effort { get; set; }
        public virtual float Time { get; set; }
        public virtual int Staff { get; set; }

        protected FPoint()
        {
        
        }
        public static FPoint SetValue (Guid PlanID, int[,] ufp, int[] caf, float ufpR, float cafR, float fpR, float effort, float time, int staff)
        {
            var @fp = new FPoint
            {
                PlanId = PlanID,
                u11 = ufp[0,0],
                u12 = ufp[0,1],
                u13 = ufp[0,2],
                u21 = ufp[1,0],
                u22 = ufp[1,1],
                u23 = ufp[1,2],
                u31 = ufp[2,0],
                u32 = ufp[2,1],
                u33 = ufp[2,2],
                u41 = ufp[3,0],
                u42 = ufp[3,1],
                u43 = ufp[3,2],
                u51 = ufp[4,0],
                u52 = ufp[4,1],
                u53 = ufp[4,2],

                c1 = caf[0],
                c2 = caf[1],
                c3 = caf[2],
                c4 = caf[3],
                c5 = caf[4],
                c6 = caf[5],
                c7 = caf[6],
                c8 = caf[7],
                c9 = caf[8],
                c10 = caf[9],
                c11 = caf[10],
                c12 = caf[11],
                c13 = caf[12],
                c14 = caf[13],

                UFP = ufpR,
                CAF = cafR,
                FP = fpR,
                Effort = effort,
                Time = time,
                Staff = staff
            };
            return fp;
        }
    }
}
