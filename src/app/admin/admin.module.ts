import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';

import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';





@NgModule({
  declarations: [
    ViewTaskComponent,
    UserManagementComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    ViewProjectsComponent,
   
    AdminSidebarComponent
         
  ],
  imports: [
    CommonModule,
    AdminRoutingModule ,
    FormsModule

  ],
  exports: [
    UserManagementComponent
  ]
})
export class AdminModule{ }
