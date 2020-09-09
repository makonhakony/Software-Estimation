using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    public class HomeDetailDto
    {
        public string name { get; set; }
        public string surname { get; set; }
        public int nPlan { get; set; }
        public int nProject { get; set; }
        public int nUCP { get; set; }
        public int nFP { get; set; }
        public int nCcm { get; set; }
        public IList<PlanListDto> AllPlan { get; set; }
    }
}
