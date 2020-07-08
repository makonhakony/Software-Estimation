using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    [AutoMapFrom(typeof(Plan))]
    public class PlanListDto: FullAuditedEntityDto<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float UUCPoint { get; set; }
        public float TFPoint { get; set; }
        public float EFPoint { get; set; }
        public float UseCasePoint { get; set; }
        public bool isEvaluated { get; set; }
    }
}
