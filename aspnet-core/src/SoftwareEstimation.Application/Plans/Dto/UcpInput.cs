using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    public class UcpInput
    {
        public string planID { get; set; }
        public int[] uucp { get; set; }
        public int[] tf { get; set; }
        public int[] ef { get; set; }
        
    }
}
