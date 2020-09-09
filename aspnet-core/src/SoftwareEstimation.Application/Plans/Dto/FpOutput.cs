using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    [AutoMapFrom(typeof(FPoint))]
    public class FpOutput : CreationAuditedEntity
    {
        public Guid PlanID { get; set; }
        public int[,] ufp { get; set; }
        public int[] caf { get; set; }
        public float effort { get; set; }
        public float time { get; set; }
        public int staff { get; set; }
    }
}
