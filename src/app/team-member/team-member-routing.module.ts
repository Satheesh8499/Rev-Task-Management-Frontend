import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamMemberLayoutComponent } from './team-member-layout/team-member-layout.component';
import { HomeComponent } from './home/home.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectTaskComponent } from './project-task/project-task.component';
import { TeamMemberDetailsComponent } from './team-member-details/team-member-details.component';

const routes: Routes = [
  {
    path:'',component:TeamMemberLayoutComponent,
    children:[
      { path: 'home', component: HomeComponent },
      { path: 'project-details', component: ProjectDetailsComponent },
      { path: 'tasks', component: TasksComponent },
      {path:'project-task',component:ProjectTaskComponent},
      {path:'team-member-details',component:TeamMemberDetailsComponent},
       { path: '', component: HomeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMemberRoutingModule { }