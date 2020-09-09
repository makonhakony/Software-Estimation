using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    public class UcpInput
    {
        public Guid planID { get; set; }
        public int[] uucp { get; set; }
        public int[] tf { get; set; }
        public int[] ef { get; set; }
        public float uucpR { get; set; }
        public float tfR { get; set; }
        public float efR { get; set; }
        public float ucpR  {get; set; }
        public float effort { get; set; }
        public float time { get; set; }
        public int staff { get; set; }

    }
}
