using Abp.Domain.Repositories;
using SoftwareEstimation.HistoricalData.Dto;
using SoftwareEstimation.Plans;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Abp.Runtime.Session;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace SoftwareEstimation.HistoricalData
{
    public class HistoEstimationAppService: SoftwareEstimationAppServiceBase, IHistoEstimationAppService
    {
        private readonly IRepository<HistoEstimation, Guid> _histRepository;
        public HistoEstimationAppService()
        {

        }
        public HistoEstimationAppService(
            IRepository<HistoEstimation, Guid> HistRepository)
        {
            _histRepository = HistRepository;
        }

        public async void CreateHistoEst (HistoInput hist)
        {
            var @histo = HistoEstimation.CreateHisto(hist.Title, hist.Description, hist.Type, hist.Time,hist.Staff, hist.Effort,hist.Point, hist.Pf);
            await _histRepository.InsertAsync(@histo);
        }
        public async Task<ListResultDto<HistoList>> GetListHisto()
        {

            var hists = await _histRepository
                .GetAll()
                .Where(e => (e.CreatorUserId == AbpSession.GetUserId()))
                .OrderByDescending(e => e.CreationTime)
                .Take(64)
                .ToListAsync();

            return new ListResultDto<HistoList>(hists.MapTo<List<HistoList>>());
        }
        public async Task<HistoAverage> GetAveragePf(string Type)
        {
            var res  = new HistoAverage();
            var hist = await _histRepository
                .GetAll()
                .Where(h => (h.CreatorUserId == AbpSession.GetUserId() && h.Type == Type))
                .ToListAsync();
            if (hist.Count() == 0)
            {
                res.notNull = false;
                res.pf = (float)(20.0/8.0/30.0);
                return res;
            }
            float sum = 0;
            int count = 0;
            foreach (HistoEstimation h in hist)
            {
                sum += h.Pf;
                count += 1;
            }
            res.notNull = true;
            res.pf = sum / count;
            return res;
        }
        public async Task Delete(EntityDto<Guid> input)
        {
            var hist = await _histRepository
                .GetAll()
                .Where(e => e.Id == input.Id)
                .FirstOrDefaultAsync();
            await _histRepository.DeleteAsync(hist);
        }
    }
}
