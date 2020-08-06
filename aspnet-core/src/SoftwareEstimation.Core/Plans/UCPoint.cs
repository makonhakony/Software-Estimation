using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans
{
    public class UCPoint: CreationAuditedEntity
    {
        public virtual Guid PlanId { get; set; }
        public virtual float UCP { get; set; }
        public virtual float UUCP { get; set; }
        public virtual float TF { get; set; }
        public virtual float EF { get; set; }

        public virtual int u0 { get; set; }
        public virtual int u1 { get; set; }
        public virtual int u2 { get; set; }
        public virtual int u3 { get; set; }
        public virtual int u4 { get; set; }
        public virtual int u5 { get; set; }

        public virtual int t0 { get; set; }
        public virtual int t1 { get; set; }
        public virtual int t2 { get; set; }
        public virtual int t3 { get; set; }
        public virtual int t4 { get; set; }
        public virtual int t5 { get; set; }
        public virtual int t6 { get; set; }
        public virtual int t7 { get; set; }
        public virtual int t8 { get; set; }
        public virtual int t9 { get; set; }
        public virtual int t10 { get; set; }
        public virtual int t11 { get; set; }
        public virtual int t12 { get; set; }

        public virtual int e0 { get; set; }
        public virtual int e1 { get; set; }
        public virtual int e2 { get; set; }
        public virtual int e3 { get; set; }
        public virtual int e4 { get; set; }
        public virtual int e5 { get; set; }
        public virtual int e6 { get; set; }
        public virtual int e7 { get; set; }

        protected UCPoint()
        {

        }

        public static UCPoint SetValue(Guid planID,int[] uucp, int[] tf, int[] ef,float ucpR, float uucpR, float tfR , float efR)
        {
            var @ucp = new UCPoint {
                PlanId = planID,
                u0 = uucp[0],
                u1 = uucp[1],
                u2 = uucp[2],
                u3 = uucp[3],
                u4 = uucp[4],
                u5 = uucp[5],


                t0 = tf[0],
                t1 = tf[1],
                t2 = tf[2],
                t3 = tf[3],
                t4 = tf[4],
                t5 = tf[5],
                t6 = tf[6],
                t7 = tf[7],
                t8 = tf[8],
                t9 = tf[9],
                t10 = tf[10],
                t11 = tf[11],
                t12 = tf[12],

                e0 = ef[0],
                e1 = ef[1],
                e2 = ef[2],
                e3 = ef[3],
                e4 = ef[4],
                e5 = ef[5],
                e6 = ef[6],
                e7 = ef[7],
                UCP = ucpR,
                UUCP = uucpR,
                TF =tfR,
                EF =efR

            };
            return @ucp;
        }


    }
}
