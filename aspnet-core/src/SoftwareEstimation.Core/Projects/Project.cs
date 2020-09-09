using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SoftwareEstimation.Projects
{
    [Table("AppProjects")]
    public class Project : FullAuditedEntity<Guid>, IMustHaveTenant
    {
        public virtual int TenantId { get; set; }
        public virtual string Title { get; protected set; }
        
        public virtual string Type { get; protected set; }
        public virtual string LinkURL { get; protected set; }
        public virtual int Sloc { get; protected set; }
        public virtual float Size { get; protected set; }
        public virtual bool isReady { get; protected set; }
        public virtual bool isCloned { get; protected set; }
        public virtual string Languages { get; protected set; }

        public const int MaxTitleLength = 100;
        public const int MaxDescriptionLength = 2000;
        protected Project()
        {

        }

        public static Project CreateWithLink ( string title, string type, string linkURL)
        {
            var @project = new Project
            {
                
                Title = title,
                Type = type,
                LinkURL = linkURL

            };

            return @project;
        }



    }
}
