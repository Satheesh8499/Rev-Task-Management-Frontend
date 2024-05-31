import { NgModule } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { ProjectManagerRoutingModule } from "./project-manager-routing.module";
import { HeaderComponent } from "./header/header.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { ManagerLayoutComponent } from "./manager-layout/manager-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CreateTaskComponent } from "./create-task/create-task.component";
import { ViewTasksComponent } from "./view-tasks/view-tasks.component";
import { ClientDetailsComponent } from './client-details/client-details.component';
// import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { CreateProjectComponent } from "./create-project/create-project.component";
import { ViewDetailsComponent } from './view-details/view-details.component';






@NgModule({
  declarations: [
  
    DashboardComponent,
    HeaderComponent,
    ManagerLayoutComponent,
    ProjectDetailsComponent,
    SideBarComponent,
    CreateProjectComponent,
    CreateTaskComponent,
     ViewTasksComponent,
     ClientDetailsComponent,
     ViewDetailsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,

  //   BrowserAnimationsModule,
   CommonModule,
   FormsModule,
  //    MatSnackBarModule,
     ProjectManagerRoutingModule,
      MatButtonModule,
      MatCardModule
  ],

  providers: [
  
  ],
  bootstrap: [ProjectManagerModule]
})
export class ProjectManagerModule { }
