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
        private readonly IRepository<Cocomo> _ccmRepository;
        private readonly IRepository<FPoint> _fpRepository;
        public PlanAppService()
        {

        }
        public PlanAppService(
            IRepository<Plan,Guid> planRepository,
            IRepository<UCPoint> ucpRepository,
            IRepository<Cocomo> ccmRepository,
            IRepository<FPoint> fpRepository)
        {
            _planRepository = planRepository;
            _ucpRepository = ucpRepository;
            _ccmRepository = ccmRepository;
            _fpRepository = fpRepository;


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
                .Include(x=>x.FpLatest)
                .Include(x => x.CcmLatest)
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

                p.CcmLatest = await _ccmRepository
                .GetAll()
                .Where(x => x.PlanId == p.Id)
                .OrderByDescending(e => e.CreationTime)
                .FirstOrDefaultAsync();

                p.FpLatest = await _fpRepository
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
                .Include(x=> x.FP)
                .Include(x => x.CCM)
                .ThenInclude(s => s.Projects)
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
        // 1 : UCP ; 2 = FP ; 3 = Cocomo
        private void setTotalEffort(float Effort, float Time, Guid PlanId, int type)
        {
            
            string connectionString = "Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True; MultipleActiveResultSets=True";
            //Create SQL conection to your database here
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                // Open your connection
                conn.Open();
                // Create the Command and Parameter objects.
                // Here change the columnames and table names as per you table
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT TotalEffort, TotalTime, TotalStaff, UcpLatestId, FpLatestId, CcmLatestId 
                            FROM dbo.AppPlans 
                            WHERE [Id]=@planId";
                    // Provide the query string with a parameter placeholder.
                    //Change the control name as per your design
                    cmd.Parameters.AddWithValue("@planId", PlanId);

                    var te = (float)0.0;
                    var tt = (float)0.0;
                    var ts = 0;
                    // Execute the Query
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        reader.Read();
                        if (reader.HasRows)
                        {
                            
                            //var uc = reader.GetInt32(reader.GetOrdinal("UcpLatestId")) as int? ?? default(int);
                            //var fc = reader.GetInt32(reader.GetOrdinal("FpLatestId")) as int? ?? default(int);
                            //var cc = reader.GetInt32(reader.GetOrdinal("UcpLatestId")) as int? ?? default(int);
                            if (reader.IsDBNull(reader.GetOrdinal("UcpLatestId")) ==false) 
                            {
                                //It has past ucp result
                                if (type == 1)
                                {
                                    
                                }
                                else
                                {
                                    using (SqlCommand cmd2 = new SqlCommand("SELECT Effort, Time FROM dbo.UCPoints WHERE [Id]=@Id", conn))
                                    {
                                        var Id = reader.GetInt32(reader.GetOrdinal("UcpLatestId"));
                                        // Provide the query string with a parameter placeholder.
                                        //Change the control name as per your design
                                        cmd2.Parameters.AddWithValue("@Id", Id);
                                        using (SqlDataReader reader2 = cmd2.ExecuteReader())
                                        {
                                            reader2.Read();
                                            if (reader2.HasRows)
                                            {
                                                var tmp= reader2.GetFloat(reader2.GetOrdinal("Effort"));
                                                te += tmp;
                                                tt = Math.Max(reader2.GetFloat(reader2.GetOrdinal("Time")),tt);
                                            }
                                            reader2.Close();
                                        }
                                        cmd2.Cancel();
                                    }
                                }

                            }
                            if (reader.IsDBNull(reader.GetOrdinal("FpLatestId")) == false)
                            {
                                //It has past fp result
                                
                                if (type == 2)
                                {
                                    
                                }
                                else
                                {
                                    using (SqlCommand cmd2 = new SqlCommand("SELECT Effort, Time FROM dbo.FPoints WHERE [Id]=@Id", conn))
                                    {
                                        var Id = reader.GetInt32(reader.GetOrdinal("FpLatestId"));
                                        // Provide the query string with a parameter placeholder.
                                        //Change the control name as per your design
                                        cmd2.Parameters.AddWithValue("@Id", Id);
                                        using (SqlDataReader reader2 = cmd2.ExecuteReader())
                                        {
                                            reader2.Read();
                                            if (reader2.HasRows)
                                            {
                                                te += reader2.GetFloat(reader2.GetOrdinal("Effort"));
                                                tt = Math.Max(reader2.GetFloat(reader2.GetOrdinal("Time")), tt);
                                            }
                                            reader2.Close();
                                        }
                                        cmd2.Cancel();
                                    }
                                }
                            }
                            if (reader.IsDBNull(reader.GetOrdinal("CcmLatestId")) == false )
                            {
                                //It has past cocomo result
                                //It has past ucp result
                                if (type == 3)
                                {
                                    
                                }
                                else
                                {
                                    using (SqlCommand cmd2 = new SqlCommand("SELECT Effort, Time FROM dbo.Cocomos WHERE [Id]=@Id", conn))
                                    {
                                        var Id = reader.GetInt32(reader.GetOrdinal("CcmLatestId"));
                                        // Provide the query string with a parameter placeholder.
                                        //Change the control name as per your design
                                        cmd2.Parameters.AddWithValue("@Id", Id);
                                        using (SqlDataReader reader2 = cmd2.ExecuteReader())
                                        {
                                            reader2.Read();
                                            if (reader2.HasRows)
                                            {
                                                te += reader2.GetFloat(reader2.GetOrdinal("Effort"));
                                                tt = Math.Max(reader2.GetFloat(reader2.GetOrdinal("Time")), tt);
                                                reader2.Close();
                                            }
                                            cmd2.Cancel();
                                        }
                                    }
                                }
                            }
                            if ((reader.IsDBNull(reader.GetOrdinal("UcpLatestId")) == true &type ==1) || (reader.IsDBNull(reader.GetOrdinal("FpLatestId")) == true && type ==2) || (reader.IsDBNull(reader.GetOrdinal("UcpLatestId")) == true && type ==3))
                            {
                                
                                te = reader.GetFloat(reader.GetOrdinal("TotalEffort"));
                                tt = reader.GetFloat(reader.GetOrdinal("TotalTime"));
                                ts = reader.GetInt32(reader.GetOrdinal("TotalStaff"));
                                
                                
                            }
                            te += Effort;
                            tt = Math.Max(tt, Time);
                            ts = (int)Math.Round(te / tt);

                        }
                        
                    }
                    using (SqlCommand cmd3 = new SqlCommand("UPDATE dbo.AppPlans SET [TotalEffort]=@effort, [TotalTime]=@time , [TotalStaff] = @staff WHERE [Id]=@planId", conn))
                    {
                        // Provide the query string with a parameter placeholder.
                        //Change the control name as per your design
                        cmd3.Parameters.AddWithValue("@planId", PlanId);
                        cmd3.Parameters.AddWithValue("@effort", te);
                        cmd3.Parameters.AddWithValue("@time", tt);
                        cmd3.Parameters.AddWithValue("@staff", ts);
                        // Execute the Query
                        cmd3.ExecuteNonQuery();
                        cmd3.Cancel();
                    }
                }
                
                conn.Close();
            }
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
            var @ucp = UCPoint.SetValue(input.planID, input.uucp, input.tf, input.ef, input.ucpR, input.uucpR, input.tfR, input.efR, input.effort, input.time, input.staff);
            await _ucpRepository.InsertAsync(@ucp);
            setTotalEffort(input.effort, input.time, input.planID,1);
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
                CreatorUserId =ucpoint.CreatorUserId,
                Id = ucpoint.Id
                
            };

            return ucp_detail;

        }

        //public async void GetPlanStatus() 
        public async void SetCcm(CcmInput input)
        {
            
            var @sep = Cocomo.SetValue(input.planID, input.Sloc, input.Mode, input.Model, input.effort, input.time, input.staff, input.projectID);
            await _ccmRepository.InsertAsync(@sep);
            setTotalEffort(input.effort, input.time, input.planID,3);
        }
       
        public async Task<CcmOutput> GetOutputCcm(Guid planID)
        {
            var cocomo = await _ccmRepository
                .GetAll()
                .Where(p => p.PlanId == planID)
                
                .OrderByDescending(e => e.CreationTime)
                .FirstOrDefaultAsync();
            
            //var sePoint = new SepOutput();
            //var flag = false;
            //if (sePointcocomo!= null)
            //{
            //    flag = true;
            //    sePoint = sePointcocomo.MapTo<SepOutput>();
                
            //}
            //if (sePointucp != null)
            //{
            //    if (!flag)
            //    {
            //        sePoint = sePointucp.MapTo<SepOutput>();
            //        flag = true;
            //    }
            //    else
            //    {
            //        sePoint.Effort += sePointucp.Effort;
            //        sePoint.Time = Math.Max(sePoint.Time, sePointucp.Time);
            //        sePoint.Staff = Math.Max(sePoint.Staff, sePointucp.Staff);
            //    }
                
               
            //    sePoint.UcpId = sePointucp.UcpId ?? default(int);
            //    sePoint.Ucp = sePointucp.Ucp ?? default(float);
            //}
            //if (sePointfp != null)
            //{
            //    if (!flag)
            //    {
            //        sePoint = sePointfp.MapTo<SepOutput>();
            //    }
            //    else
            //    {
            //        sePoint.Effort += sePointfp.Effort;
            //        sePoint.Time = Math.Max(sePoint.Time, sePointucp.Time);
            //        sePoint.Staff = Math.Max(sePoint.Staff, sePointucp.Staff);
            //    }
            //    sePoint.FpId = sePointfp.FpId ?? default(int);
            //    sePoint.Fp = sePointfp.Fp ?? default(float);
            //}
    
            
            
            return cocomo.MapTo<CcmOutput>();

        }

        //Funtion point
        public async void SetFp(FpInput input)
        {
            var @fp = FPoint.SetValue(input.planID, input.ufp, input.caf, input.ufpR, input.cafR, input.fpR, input.effort, input.time, input.staff);
            await _fpRepository.InsertAsync(@fp);
            setTotalEffort(input.effort, input.time, input.planID,2);
        }

        public async Task<FpOutput> GetOutputFp(Guid planID)
        {
            var fpoint = await _fpRepository
                .GetAll()
                .Where(p => p.PlanId == planID)
                .OrderByDescending(e => e.CreationTime)
                .FirstOrDefaultAsync();

            var fp_detail = new FpOutput
            {
                PlanID = planID,
                ufp = new int[,] {
                    { fpoint.u11, fpoint.u12, fpoint.u13 },
                    { fpoint.u21, fpoint.u22, fpoint.u23},
                    { fpoint.u31, fpoint.u32, fpoint.u33},
                    { fpoint.u41, fpoint.u42, fpoint.u43},
                    { fpoint.u51, fpoint.u52, fpoint.u53},
                },
                caf = new int[] { fpoint.c1, fpoint.c2, fpoint.c3, fpoint.c4, fpoint.c5, fpoint.c6, fpoint.c7, fpoint.c8, fpoint.c9, fpoint.c10, fpoint.c11, fpoint.c12, fpoint.c13, fpoint.c14},
                CreationTime = fpoint.CreationTime,
                CreatorUserId = fpoint.CreatorUserId,
                Id = fpoint.Id

            };

            return fp_detail;

        }

        private int CountPlan()
        {
            
            using (SqlConnection cn = new SqlConnection("Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True;"))
            using (SqlCommand cm = cn.CreateCommand())
            {
                cm.CommandText = @"
                        SELECT COUNT(*)
                        FROM   AppPlans
                        WHERE  CreatorUserId = @userId AND TenantId = @tenantId";
                cm.Parameters.AddWithValue("@userId", AbpSession.GetUserId());
                cm.Parameters.AddWithValue("@tenantId", AbpSession.GetTenantId());
                cn.Open();
                return (int)cm.ExecuteScalar();
            }     
        }
        private int CountProject()
        {

            using (SqlConnection cn = new SqlConnection("Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True;"))
            using (SqlCommand cm = cn.CreateCommand())
            {
                cm.CommandText = @"
                        SELECT COUNT(*)
                        FROM   AppProjects
                        WHERE  CreatorUserId = @userId AND TenantId = @tenantId";
                cm.Parameters.AddWithValue("@userId", AbpSession.GetUserId());
                cm.Parameters.AddWithValue("@tenantId", AbpSession.GetTenantId());
                cn.Open();
                return (int)cm.ExecuteScalar();
            }
        }

        private int CountUCP()
        {
            using (SqlConnection cn = new SqlConnection("Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True;"))
            using (SqlCommand cm = cn.CreateCommand())
            {
                cm.CommandText = @"
                        SELECT COUNT(*)
                        FROM   UCPoints
                        WHERE  CreatorUserId = @userId";
                cm.Parameters.AddWithValue("@userId", AbpSession.GetUserId());     
                cn.Open();
                return (int)cm.ExecuteScalar();
            }
        }
        private int CountCcm()
        {
            using (SqlConnection cn = new SqlConnection("Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True;"))
            using (SqlCommand cm = cn.CreateCommand())
            {
                cm.CommandText = @"
                        SELECT COUNT(*)
                        FROM   Cocomos
                        WHERE  CreatorUserId = @userId";
                cm.Parameters.AddWithValue("@userId", AbpSession.GetUserId());
                cn.Open();
                return (int)cm.ExecuteScalar();
            }
        }

        private int CountFP()
        {
            using (SqlConnection cn = new SqlConnection("Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True;"))
            using (SqlCommand cm = cn.CreateCommand())
            {
                cm.CommandText = @"
                        SELECT COUNT(*)
                        FROM   FPoints
                        WHERE  CreatorUserId = @userId";
                cm.Parameters.AddWithValue("@userId", AbpSession.GetUserId());
                cn.Open();
                return (int)cm.ExecuteScalar();
            }
        }
        private string getUsername()
        {
            using (SqlConnection cn = new SqlConnection("Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True;"))
            using (SqlCommand cm = cn.CreateCommand())
            {
                cm.CommandText = @"
                        SELECT Name
                        FROM   AbpUsers
                        WHERE  Id = @userId";
                cm.Parameters.AddWithValue("@userId", AbpSession.GetUserId());
                cn.Open();
                return (string)cm.ExecuteScalar();
            }
        }
        private string getUsersurname()
        {
            using (SqlConnection cn = new SqlConnection("Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True;"))
            using (SqlCommand cm = cn.CreateCommand())
            {
                cm.CommandText = @"
                        SELECT Surname
                        FROM   AbpUsers
                        WHERE  Id = @userId";
                cm.Parameters.AddWithValue("@userId", AbpSession.GetUserId());
                cn.Open();
                return (string)cm.ExecuteScalar();
            }
        }
        public async Task<HomeDetailDto> GeneralInformation()
        {
            var info = new HomeDetailDto();
            info.name = getUsername();
            info.surname = getUsersurname();
            info.nPlan = CountPlan();
            info.nProject = CountProject();
            info.nUCP = CountUCP();
            info.nFP = CountFP();
            info.nCcm = CountCcm();
            var plans = await _planRepository
                .GetAll()
                .Include(x => x.UcpLatest)
                .Include(x => x.FpLatest)
                .Include(x => x.CcmLatest)
                .Where(e => (e.CreatorUserId == AbpSession.GetUserId()))
                //.OrderByDescending(e => e.CreationTime)
                //.Take(64)
                .ToListAsync();



            foreach (Plan p in plans)
            {
                p.UcpLatest = await _ucpRepository
                .GetAll()
                .Where(x => x.PlanId == p.Id)
                .OrderByDescending(e => e.CreationTime)
                .FirstOrDefaultAsync();

                p.CcmLatest = await _ccmRepository
                .GetAll()
                .Where(x => x.PlanId == p.Id)
                .OrderByDescending(e => e.CreationTime)
                .FirstOrDefaultAsync();

                p.FpLatest = await _fpRepository
                .GetAll()
                .Where(x => x.PlanId == p.Id)
                .OrderByDescending(e => e.CreationTime)
                .FirstOrDefaultAsync();

            };
            info.AllPlan = plans.MapTo<List<PlanListDto>>();
            return info;
        }
    }
}
