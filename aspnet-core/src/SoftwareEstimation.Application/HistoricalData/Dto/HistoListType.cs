using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using SoftwareEstimation.Plans;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.HistoricalData.Dto
{
    [AutoMapFrom(typeof(HistoEstimation))]
    public class HistoListType : FullAuditedEntity<Guid>
    {
        public string Title { get; set; }
    }
}
