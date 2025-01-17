﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.Projects.Dto
{
    [AutoMapFrom(typeof(Project))]
    public class ProjectDetailOutput : FullAuditedEntityDto<Guid>
    {
        public string Title { get; set; }
        public string Type { get; set; }
        public string LinkURL { get; set; }
        public string isReady { get; set; }

    }
}
