﻿using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SoftwareEstimation.Authorization;

namespace SoftwareEstimation
{
    [DependsOn(
        typeof(SoftwareEstimationCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class SoftwareEstimationApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<SoftwareEstimationAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(SoftwareEstimationApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
