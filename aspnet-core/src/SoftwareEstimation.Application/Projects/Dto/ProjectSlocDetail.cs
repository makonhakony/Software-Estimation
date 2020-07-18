using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Projects.Dto
{
    [AutoMapFrom(typeof(Project))]
    public class ProjectSlocDetail
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int Sloc { get; set; }
        public bool isReady { get; set; }
    }
}
