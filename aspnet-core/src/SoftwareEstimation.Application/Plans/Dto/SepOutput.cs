using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    [AutoMapFrom(typeof(SEPoint))]
    public class SepOutput :CreationAuditedEntity
    {
        public Guid planID { get; set; }
        public int Sloc { get; set; }
        public int Mode { get; set; }
        public int Model { get; set; }
        public float Effort { get; set; }
        public float Time { get; set; }
        public int Staff { get; set; }
    }
}
