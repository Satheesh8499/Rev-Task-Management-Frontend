import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  {
    path: 'team-member',
    loadChildren: () => import('./team-member/team-member.module').then(m => m.TeamMemberModule),
    //canActivate: [AuthGuard],
    data: { role: 'team-member' }
  },
  {
    path: 'manager',
    loadChildren: () => import('./project-manager/project-manager.module').then(m => m.ProjectManagerModule),
    // canActivate: [AuthGuard],
    data: { role: 'manager'}
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    //canActivate: [AuthGuard],
    data: { role: 'admin' }
   },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
