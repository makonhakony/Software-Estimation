using Abp.Domain.Repositories;
using SoftwareEstimation.SharedEstimations;
using System;
using System.Collections.Generic;
using System.Text;

namespace SoftwareEstimation.SharedData
{
    public class SharedEstimationAppService : SoftwareEstimationAppServiceBase, ISharedEstiamtionAppService
    {
        private readonly IRepository<SharedEstimation> _sharedRepository;
        public SharedEstimationAppService()
        {

        }
        public SharedEstimationAppService(
            IRepository<SharedEstimation> sharedRepository)
        {
            _sharedRepository = sharedRepository;
        }

    }
}
