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
using System.Data.SqlClient;
using Abp.Collections.Extensions;
using Abp.UI;

namespace SoftwareEstimation.Plans
{
    public class PlanAppService :SoftwareEstimationAppServiceBase , IPlanAppService
    {
        private readonly IRepository<Plan, Guid> _planRepository;
        private readonly IRepository<UCPoint> _ucpRepository;
        private readonly IRepository<SEPoint> _sepRepository;
        public PlanAppService()
        {

        }
        public PlanAppService(
            IRepository<Plan,Guid> planRepository,
            IRepository<UCPoint> ucpRepository,
            IRepository<SEPoint> sepRepository)
        {
            _planRepository = planRepository;
            _ucpRepository = ucpRepository;
            _sepRepository = sepRepository;


        }

        public async Task<Guid> CreatePlans(PlanInput Plans)
        {
            var @plan = Plan.CreatePlan(Plans.Title,Plans.Description);
            await _planRepository.InsertAsync(@plan);
            return plan.Id;
        }
        
        public async Task<ListResultDto<PlanListDto>> GetListPlan()
        {
           
            var plans = await _planRepository
                .GetAll()  
                .Include(x=> x.UcpLatest)
                
                .Include(x => x.SepLatest)
                .Where(e => (e.CreatorUserId == AbpSession.GetUserId()))
                //.OrderByDescending(e => e.CreationTime)
                //.Take(64)
                .ToListAsync();

            
            
            foreach(Plan p in plans)
            {
                p.UcpLatest = await _ucpRepository
                .GetAll()
                .Where(x => x.PlanId == p.Id)
                .OrderByDescending(e => e.CreationTime)
                .FirstOrDefaultAsync();

                p.SepLatest = await _sepRepository
                .GetAll()
                .Where(x => x.PlanId == p.Id)
                .OrderByDescending(e => e.CreationTime)
                .FirstOrDefaultAsync();

                
            };
            
            return new ListResultDto<PlanListDto>(plans.MapTo<List<PlanListDto>>()); 
        }
        
        

        public async Task<PlanDetailOutput> GetPlanDetail (Guid PlanId)
        {
            var @plan = await _planRepository
                .GetAll()
                .Include(x => x.UCP)
                .Include(x => x.SEP)
                .Where(p => p.Id == PlanId)
                .FirstOrDefaultAsync();
            if (@plan == null)
            {
                throw new UserFriendlyException("Could not found the plan, maybe it's deleted.");
            }

            return @plan.MapTo<PlanDetailOutput>();
        }
        public async Task Delete(EntityDto<Guid> input)
        {
            var @plan = await _planRepository
                .GetAll()
                .Where(e => e.Id == input.Id)
                .FirstOrDefaultAsync();
            await _planRepository.DeleteAsync(@plan);
        }
        //public void UpdatePlanResult(string Id, float Ucpoint)
        //{
        //    //hmmmmmmmmmm...seem wrong...
        //    //var @planin = Plan.UpdatePlan(plan.Id, plan.Title, plan.Description, plan.UCPoint, plan.FPoint, plan.SEPoint, AbpSession.GetUserId());
        //    //await _planRepository.UpdateAsync(@planin);
        //    string connectionString = "Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True;";
        //    //Create SQL conection to your database here
        //    using (SqlConnection conn = new SqlConnection(connectionString))
        //    {
        //        // Open your connection
        //        conn.Open();
        //        // Create the Command and Parameter objects.
        //        // Here change the columnames and table names as per you table
        //        using (SqlCommand cmd = new SqlCommand("UPDATE dbo.AppPlans SET [UCPoint]=@ucp WHERE [Id]=@planId", conn))
        //        {
        //            // Provide the query string with a parameter placeholder.
        //            //Change the control name as per your design
        //            cmd.Parameters.AddWithValue("@planId", Id);
        //            cmd.Parameters.AddWithValue("@ucp", Ucpoint);

        //            // Execute the Query
        //            cmd.ExecuteNonQuery();
        //        }
        //        conn.Close();
        //    }
        //}

        public async void SetUcp(UcpInput input)
        {
            var @ucp = UCPoint.SetValue(input.planID, input.uucp, input.tf, input.ef, input.ucpR, input.uucpR, input.tfR, input.efR);
            await _ucpRepository.InsertAsync(@ucp);
        }

        public async Task<UcpOutput> GetOutputUcp(Guid planID)
        {
            var ucpoint = await _ucpRepository
                .GetAll()
                .Where(p => p.PlanId == planID)
                .OrderByDescending(e => e.CreationTime)
                .FirstOrDefaultAsync();

            var ucp_detail = new UcpOutput
            {
                PlanID = planID,
                Uucp = new int[] { ucpoint.u0, ucpoint.u1, ucpoint.u2, ucpoint.u3, ucpoint.u4, ucpoint.u5 },
                Tf = new int[] { ucpoint.t0, ucpoint.t1, ucpoint.t2, ucpoint.t3, ucpoint.t4, ucpoint.t5, ucpoint.t6, ucpoint.t7, ucpoint.t8, ucpoint.t9, ucpoint.t10, ucpoint.t11, ucpoint.t12 },
                Ef = new int[] { ucpoint.e0, ucpoint.e1, ucpoint.e2, ucpoint.e3, ucpoint.e4, ucpoint.e5, ucpoint.e6, ucpoint.e7, },
                CreationTime = ucpoint.CreationTime,
                CreatorUserId =ucpoint.Id,
                Id = ucpoint.Id
                
            };

            return ucp_detail;

        }

        //public async void GetPlanStatus() 
        public async void SetSep(SepInput input)
        {
            var @sep = SEPoint.SetValue(input.planID,input.Sloc, input.Mode, input.Model, input.effort, input.time, input.staff);
            await _sepRepository.InsertAsync(@sep);
        }

        public async Task<SepOutput> GetSepOutput(Guid planID)
        {
            var sePoint = await _sepRepository
                .GetAll()
                .Where(p => p.PlanId == planID)
                .OrderByDescending(e => e.CreationTime)
                .FirstOrDefaultAsync();
                
            return sePoint.MapTo<SepOutput>();
        }

        
    }
}
