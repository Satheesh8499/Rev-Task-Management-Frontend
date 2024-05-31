import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasksComponent } from './tasks/tasks.component';
import { BootstrapDialogComponent } from './bootstrap-dialog/bootstrap-dialog.component';
import { FormsModule } from '@angular/forms';
import { TeamMemberLayoutComponent } from './team-member-layout/team-member-layout.component'; // Import FormsModule
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamMemberRoutingModule } from './team-member-routing.module';
import { ProjectTaskComponent } from './project-task/project-task.component';
import { TeamMemberDetailsComponent } from './team-member-details/team-member-details.component';


const routes: Routes = [
  
];

@NgModule({ declarations: [
        HeaderComponent,
        HomeComponent,
        ProjectDetailsComponent,
        SidebarComponent,
        TasksComponent,
        BootstrapDialogComponent,
        TeamMemberLayoutComponent,
        ProjectTaskComponent,
        TeamMemberDetailsComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent
    ], imports: [CommonModule,
        TeamMemberRoutingModule,
        FormsModule,
        NgbModule,
        NgbModalModule,
        CommonModule], providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class TeamMemberModule { }