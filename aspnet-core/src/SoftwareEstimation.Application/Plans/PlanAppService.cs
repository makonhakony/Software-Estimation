using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Microsoft.EntityFrameworkCore;
using SoftwareEstimation.Plans.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;

namespace SoftwareEstimation.Plans
{
    public class PlanAppService :SoftwareEstimationAppServiceBase , IPlanAppService
    {
        private readonly IRepository<Plan, Guid> _planRepository;
        private readonly IRepository<UCPoint> _ucpRepository;
        public PlanAppService()
        {

        }
        public PlanAppService(
            IRepository<Plan,Guid> planRepository,
            IRepository<UCPoint> ucpRepository)
        {
            _planRepository = planRepository;
            _ucpRepository = ucpRepository;

        }

        public async void CreatePlans(PlanInput Plans)
        {
            var @plan = Plan.CreatePlan(Plans.Title,Plans.Description);
            await _planRepository.InsertAsync(@plan);
        }

        public async Task<ListResultDto<PlanListDto>> GetListProject()
        {
            var plans = await _planRepository
                .GetAll()
                .Where(e => (e.CreatorUserId == AbpSession.GetUserId()))
                //.OrderByDescending(e => e.CreationTime)
                //.Take(64)
                .ToListAsync();
            return new ListResultDto<PlanListDto>(plans.MapTo<List<PlanListDto>>());
        }

        public async void UpdatePlanResult(PlanUpdate plan)
        {
            //hmmmmmmmmmm...seem wrong...
            var @planin = Plan.UpdatePlan(plan.Id, plan.Title, plan.Description, plan.Uucp, plan.Tf ,plan.Ef, plan.Ucp, AbpSession.GetUserId(), true);
            await _planRepository.UpdateAsync(@planin);
        }

        public async void SetUcp(UcpInput input)
        {
            var @ucp = UCPoint.SetValue(input.planID, input.uucp, input.tf, input.ef);
            await _ucpRepository.InsertAsync(@ucp);
        }

        public async Task<UcpOutput> GetOutputUcp(string planID)
        {
            var ucpoint = await _ucpRepository
                .GetAll()
                .Where(p => p.PlanId == planID)
                .OrderByDescending(e => e.CreationTime)
                .FirstOrDefaultAsync();

            var ucp_detail = new UcpOutput
            {
                PlanID = planID,
                Uucp = new int[]{ucpoint.u0, ucpoint.u1, ucpoint.u2, ucpoint.u3, ucpoint.u4, ucpoint.u5},
                Tf = new int[] {ucpoint.t0, ucpoint.t1, ucpoint.t2, ucpoint.t3, ucpoint.t4, ucpoint.t5, ucpoint.t6, ucpoint.t7, ucpoint.t8, ucpoint.t9, ucpoint.t10, ucpoint.t11, ucpoint.t12 },
                Ef = new int[] {ucpoint.e0, ucpoint.e1, ucpoint.e2, ucpoint.e3, ucpoint.e4, ucpoint.e5, ucpoint.e6, ucpoint.e7, },
                CreateTime = ucpoint.CreationTime.ToString()
            };

            return ucp_detail;

        }
        
        //public async void GetPlanStatus() 

    }
}
