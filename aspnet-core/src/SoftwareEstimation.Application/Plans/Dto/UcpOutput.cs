using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    [AutoMapFrom(typeof(UCPoint))]
    public class UcpOutput : CreationAuditedEntity
    {
        public Guid PlanID { get; set; }
        public int[] Uucp { get; set; }
        public int[] Ef { get; set; }
        public int[] Tf { get; set; }
        public float effort { get; set; }
        public float time { get; set; }
        public int staff { get; set; }
    }
}
