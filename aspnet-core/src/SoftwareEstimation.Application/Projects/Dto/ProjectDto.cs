using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Projects.Dto
{
    [AutoMapFrom(typeof(Project))]
    class ProjectDto:EntityDto<long>
    {
        public long UserID { get; set; }
        public string Title { get; protected set; }
        public string Type { get; protected set; }
        public string LinkURL { get; protected set; }
    }
}
