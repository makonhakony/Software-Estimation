using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    public class FpInput
    {
        public Guid planID { get; set; }
        public int[,] ufp { get; set; }
        public int[]caf { get; set; }
        public float ufpR { get; set; }
        public float cafR { get; set; }
        public float fpR { get; set; }
    }
}
