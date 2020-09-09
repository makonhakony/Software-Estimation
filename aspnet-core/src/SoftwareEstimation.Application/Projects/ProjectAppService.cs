using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using SoftwareEstimation.Projects.Dto;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SoftwareEstimation.Projects
{
    public class ProjectAppService : SoftwareEstimationAppServiceBase, IProjectAppService
    {

        private readonly IRepository<Project, Guid> _projectRespository;
        public ProjectAppService()
        {

        }
        public ProjectAppService(IRepository<Project, Guid> projectRepository)
        {
            _projectRespository = projectRepository;
        }
        public async Task<Guid> CreateWithLink(ProjectInput Projects)
        {
            
            var @project = Project.CreateWithLink( Projects.Title, Projects.Type, Projects.LinkURL);
            await _projectRespository.InsertAsync(@project);
            return project.Id;
        }

        public async Task<ListResultDto<ProjectListDto>> GetListProject()
        {
            var projects = await _projectRespository
                .GetAll()
                .Where( e => (e.CreatorUserId== AbpSession.GetUserId()))
                //.OrderByDescending(e => e.CreationTime)
                //.Take(64)
                .ToListAsync();
            return new ListResultDto<ProjectListDto>(projects.MapTo<List<ProjectListDto>>());
        }

        public async Task<ProjectDetailOutput> GetProjectDetail(EntityDto<Guid> input)
        {

            var @project = await _projectRespository
                .GetAll()
                .Where(e => e.Id == input.Id)
                .FirstOrDefaultAsync();

            if (@project == null)
            {
                throw new UserFriendlyException("Could not found the project, maybe it's deleted.");
            }

            return @project.MapTo<ProjectDetailOutput>();

        }

        public async Task Delete(EntityDto<Guid> input)
        {
            var @project = await _projectRespository
                .GetAll()
                .Where(e => e.Id == input.Id)
                .FirstOrDefaultAsync();
            await _projectRespository.DeleteAsync(@project);
        }

        public long GetUserID()
        {
            long a = AbpSession.GetUserId();

            return a;
        }

        public void ModifySlocValue(string Id, int Sloc)
        {
            string connectionString = "Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True;";
            //Create SQL conection to your database here
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                // Open your connection
                conn.Open();
                // Create the Command and Parameter objects.
                // Here change the columnames and table names as per you table
                using (SqlCommand cmd = new SqlCommand("UPDATE dbo.AppProjects SET [Sloc]=@Sloc, [isReady]=1 WHERE [Id]=@ProjectId", conn))
                {
                    // Provide the query string with a parameter placeholder.
                    //Change the control name as per your design
                    cmd.Parameters.AddWithValue("@projectId", Id);
                    cmd.Parameters.AddWithValue("@Sloc", Sloc);
                    
                    // Execute the Query
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
        }

        public void ModifySizeValue(string Id, float Size)
        {
            string connectionString = "Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True;";
            //Create SQL conection to your database here
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                // Open your connection
                conn.Open();
                // Create the Command and Parameter objects.
                // Here change the columnames and table names as per you table
                using (SqlCommand cmd = new SqlCommand("UPDATE dbo.AppProjects SET [Size]=@Size, [isCloned]=1 WHERE [Id]=@ProjectId", conn))
                {
                    // Provide the query string with a parameter placeholder.
                    //Change the control name as per your design
                    cmd.Parameters.AddWithValue("@projectId", Id);
                    cmd.Parameters.AddWithValue("@Size", Size);

                    // Execute the Query
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
        }

        public async Task<ListResultDto<ProjectSlocDetail>> GetListSlocDetail()
        {
            var project = await _projectRespository
                .GetAll()
                .Where(p => p.CreatorUserId == AbpSession.GetUserId() && p.isReady)
                //.Where(p => p.isReady == true)
                .ToListAsync();

            return new ListResultDto<ProjectSlocDetail>(project.MapTo<List<ProjectSlocDetail>>());
        }

        public void ModifyLanguageValue(string Id, string Languages)
        {
            string connectionString = "Server=localhost; Database=SoftwareEstimationDb; Trusted_Connection=True;";
            //Create SQL conection to your database here
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                // Open your connection
                conn.Open();
                // Create the Command and Parameter objects.
                // Here change the columnames and table names as per you table
                using (SqlCommand cmd = new SqlCommand("UPDATE dbo.AppProjects SET [Languages]=@Languages WHERE [Id]=@ProjectId", conn))
                {
                    // Provide the query string with a parameter placeholder.
                    //Change the control name as per your design
                    cmd.Parameters.AddWithValue("@projectId", Id);
                    cmd.Parameters.AddWithValue("@Languages", Languages);

                    // Execute the Query
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
        }
    }
}
