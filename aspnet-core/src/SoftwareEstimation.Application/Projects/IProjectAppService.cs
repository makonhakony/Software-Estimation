using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SoftwareEstimation.Projects.Dto;
using System;
using System.Threading.Tasks;

namespace SoftwareEstimation.Projects
{
    public interface IProjectAppService: IApplicationService
    {
        Task<Guid> CreateWithLink(ProjectInput Projects);
        Task<ListResultDto<ProjectListDto>> GetListProject();
        Task<ProjectDetailOutput> GetProjectDetail(EntityDto<Guid> input);
        Task Delete(EntityDto<Guid> input);
        long GetUserID();
        void ModifySlocValue(string Id, int Sloc);
        void ModifySizeValue(string Id, float Size);
        Task<ListResultDto<ProjectSlocDetail>> GetListSlocDetail();
    }
}