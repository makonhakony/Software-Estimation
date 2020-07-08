using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SoftwareEstimation.Plans.Dto;
using System;
using System.Threading.Tasks;

namespace SoftwareEstimation.Plans
{
    public interface IPlanAppService : IApplicationService
    {
        void CreatePlans(PlanInput Plans);
        Task<ListResultDto<PlanListDto>> GetListProject();
        void UpdatePlanResult(PlanUpdate plan);
        void SetUcp(UcpInput input);
        Task<UcpOutput> GetOutputUcp(string planID);
    }
}