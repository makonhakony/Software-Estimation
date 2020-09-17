using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using SoftwareEstimation.Plans;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.HistoricalData.Dto
{
    [AutoMapFrom(typeof(HistoEstimation))]
    public class HistoDto : EntityDto<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public float Time { get; set; }
        public int Staff { get; set; }
        public float Effort { get; set; }
        public float Point { get; set; }
        public float Pf { get; set; }
    }
}
