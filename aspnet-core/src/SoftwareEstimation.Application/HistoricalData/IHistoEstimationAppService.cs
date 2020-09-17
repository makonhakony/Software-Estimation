using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SoftwareEstimation.HistoricalData.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareEstimation.HistoricalData
{
    public interface IHistoEstimationAppService : IApplicationService
    {
        void CreateHistoEst(HistoInput hist);
        Task<ListResultDto<HistoList>> GetListHisto();
        Task<HistoAverage> GetAveragePf(string Type);
    }
}
