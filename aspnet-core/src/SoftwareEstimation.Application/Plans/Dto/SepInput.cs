using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    public class SepInput
    {
        public Guid planID { get; set; }
        public int Sloc { get; set; }
        public int Mode { get; set; }
        public int Model { get; set; }
        public float effort { get; set; }
        public float time { get; set; }
        public int staff { get; set; }
    }
}
