using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    public class UcpOutput
    {
        public string PlanID { get; set; }
        public int[] Uucp { get; set; }
        public int[] Ef { get; set; }
        public int[] Tf { get; set; }
        public string CreateTime { get; set; }
    }
}
