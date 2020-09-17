using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SoftwareEstimation.Plans
{
    [Table("AppHistoricalEstimation")]
    public class HistoEstimation: FullAuditedEntity<Guid>, IMustHaveTenant
    {
        public virtual int TenantId { get; set; }
        public virtual string Title { get; protected set; }
        public virtual string Description { get; protected set; }
        public virtual string Type { get; protected set; }
        public virtual float Time { get; protected set; }
        public virtual int Staff { get; protected set; }
        public virtual float Effort { get; protected set; }
        public virtual float Point { get; protected set; }
        public virtual float Pf { get; protected set; }

        protected HistoEstimation()
        {

        }

        public static HistoEstimation CreateHisto(string title, string description, string type, float time, int staff, float effort, float point, float pf)
        {
            var @hist = new HistoEstimation
            {
                Title = title,
                Description = description,
                Type = type,
                Time = time,
                Staff = staff,
                Effort = effort,
                Point = point,
                Pf = pf
            };
            return hist;
        }
        public static HistoEstimation UpdateHisto(Guid id, long userId, int tenantId,string title, string description, string type, float time, int staff, float effort, float point, float pf)
        {
            var @hist = new HistoEstimation
            {
                Id = id,
                CreatorUserId = userId,
                TenantId = tenantId,
                Title = title,
                Description = description,
                Type = type,
                Time = time,
                Staff = staff,
                Effort = effort,
                Point = point,
                Pf = pf
            };
            return hist;
        }
    }
}
