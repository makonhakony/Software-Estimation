using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Plans.Dto
{
    public class PlanUpdate
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public float Uucp { get; set; }
        public float Tf { get; set; }
        public float Ef { get; set; }
        public float Ucp { get; set; }
    }
}
