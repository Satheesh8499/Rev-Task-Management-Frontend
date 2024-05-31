import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./core/login/login.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { TeamMemberModule } from "./team-member/team-member.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminModule } from "./admin/admin.module";
import { ProjectManagerModule } from "./project-manager/project-manager.module";
import { AuthService } from "./core/auth.service";
import { AuthGuard } from "./core/auth.guard";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ProfileComponent } from './profile/profile.component';




@NgModule({ declarations: [
          AppComponent,
        LoginComponent,
        ProfileComponent
        
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,
        CommonModule,
        NgbModule,
        AppRoutingModule,
        TeamMemberModule,
        FormsModule,
        AdminModule,
        ReactiveFormsModule,
        ProjectManagerModule
      
    ],
    providers: [AuthService, AuthGuard, provideAnimationsAsync(), provideHttpClient(withInterceptorsFromDi())] 
})
export class AppModule { }




