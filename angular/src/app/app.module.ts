import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
import { ProjectComponent } from './project/project.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { CreateProjectService } from './project/create-project/create-porject.service';
import { ProjectDetailService } from './project/project-detail/project-detail.service';
import { ProjectCalInfoComponent } from './project/project-cal-info/project-cal-info/project-cal-info.component';
import { ProjectCalInfoService } from './project/project-cal-info/project-cal-info/project-cal-info.service';
import { InternalProjectService } from './project/project.service';
import {MatStepperModule} from '@angular/material/stepper';
import { UcpComponent } from './UCP/ucp.component';
import { UnadjustedUcpComponent } from './UCP/unadjusted-ucp/unadjusted-ucp.component';
import { TechnicalComplexityComponent } from './UCP/technical-complexity/technical-complexity.component';
import { EnvironmentalComplexityComponent } from './UCP/environmental-complexity/environmental-complexity.component';
import { CalUcpComponent } from './UCP/cal-ucp/cal-ucp.component';
import { CocomoComponent } from './project/cocomo/cocomo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TopBarComponent,
    TopBarLanguageSwitchComponent,
    SideBarUserAreaComponent,
    SideBarNavComponent,
    SideBarFooterComponent,
    RightSideBarComponent,
    
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    // projects
    ProjectComponent,
    ProjectDetailComponent,
    CreateProjectComponent,
    ProjectCalInfoComponent,
    //UCP
    UcpComponent,
    UnadjustedUcpComponent,
    TechnicalComplexityComponent,
    EnvironmentalComplexityComponent,
    CalUcpComponent,
    CocomoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forRoot(),
    AbpModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
  ],
  providers: [
    CreateProjectService,
    ProjectDetailService,
    ProjectCalInfoService,
    InternalProjectService,
    {provide: MatDialogRef, useValue: {}},
    {provide:MAT_DIALOG_DATA, useValue:{}}
    
  ],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
    //project
    CreateProjectComponent
  ],
  
})
export class AppModule {}
