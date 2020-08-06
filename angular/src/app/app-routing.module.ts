import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectCalInfoComponent } from './project/project-cal-info/project-cal-info/project-cal-info.component';
import { UcpComponent } from './UCP/ucp.component';
import { CocomoComponent } from './project/cocomo/cocomo.component';
import { TestRadioComponent } from './project/test-radio/test-radio.component';
import { EstimationComponent } from './estimation/estimation.component';
import { EstimationDetailComponent } from './estimation/estimation-detail/estimation-detail.component';
import { CyclomaticComponent } from './cyclomatic/cyclomatic.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },
                    { path: 'project', component:  ProjectComponent},
                    { path: 'project/:projectId', component: ProjectDetailComponent},
                    { path: 'project/:projectId/detail/:userId/:projectTitle',component:ProjectCalInfoComponent},
                    { path: 'update-password', component: ChangePasswordComponent },
                    { path: 'ucp', component:  UcpComponent},
                    { path: 'SnEpoint', component:  CocomoComponent},
                    { path: 'estimation', component:  EstimationComponent},
                    { path: 'estimation/:estimationId',component: EstimationDetailComponent},
                    { path: 'CCEva',component: CyclomaticComponent},
                    {path:'test',component: TestRadioComponent}
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
