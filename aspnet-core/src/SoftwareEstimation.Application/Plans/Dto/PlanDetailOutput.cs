using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    [AutoMapFrom(typeof(Plan))]
    public class PlanDetailOutput
    {
        public string title { get; set; }
        public string Description { get; set; }
        public IList<UCPoint> UCP { get; set; }
        public IList<FPoint> FP { get; set; }
        public IList<SEPoint> SEP { get; set; }

    }
}
