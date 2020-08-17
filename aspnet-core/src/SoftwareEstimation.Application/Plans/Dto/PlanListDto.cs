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
        
        public UCPoint UcpLatest { get; set; }
        public SEPoint SepLatest { get; set; }
        public FPoint FpLatest { get; set; }

    }
}
