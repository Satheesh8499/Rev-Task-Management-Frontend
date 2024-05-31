import { RouterModule, Routes } from "@angular/router";
import { ManagerLayoutComponent } from "./manager-layout/manager-layout.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CreateProjectComponent } from "./create-project/create-project.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { CreateTaskComponent } from "./create-task/create-task.component";
import { ViewTasksComponent } from "./view-tasks/view-tasks.component";
import { ClientDetailsComponent } from "./client-details/client-details.component";
import { ViewDetailsComponent } from "./view-details/view-details.component";


const routes: Routes = [
  {
    path: '',
    component: ManagerLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'createTask', component: CreateTaskComponent },
      { path: 'view-tasks', component: ViewTasksComponent },
      {
         path:'',component:DashboardComponent
      },

      {
        path:'createProject',
        component: CreateProjectComponent
      },
      {
        path:'projectdetails',
        component: ProjectDetailsComponent
      },
      {
        path:'clientdetails',
        component:ClientDetailsComponent
      },
      { path: 'view-tasks/:projectId', 
      component: ViewTasksComponent 
    },
    { path: 'view-details/:projectId', 
    component: ViewDetailsComponent 
  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagerRoutingModule { }
