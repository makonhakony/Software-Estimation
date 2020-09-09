using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SoftwareEstimation.Plans.Dto;
using System;
using System.Threading.Tasks;

namespace SoftwareEstimation.Plans
{
    public interface IPlanAppService : IApplicationService
    {
        Task<Guid> CreatePlans(PlanInput Plans);
        Task<ListResultDto<PlanListDto>> GetListPlan();
        //void UpdatePlanResult(string Id, float Ucpoint);
        void SetUcp(UcpInput input);
        Task<UcpOutput> GetOutputUcp(Guid planID);
        void SetCcm(CcmInput input);
        Task<CcmOutput> GetOutputCcm(Guid planID);
        Task<HomeDetailDto> GeneralInformation();
    }
}