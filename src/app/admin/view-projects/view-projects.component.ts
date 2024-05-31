import { Component ,OnInit} from '@angular/core';
import { ProjectServiceService } from '../../service/project-service.service';


@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrl: './view-projects.component.css'
})
export class ViewProjectsComponent implements OnInit{
  projects: any;
  constructor(private projectService:ProjectServiceService){}
  ngOnInit(): void {
    this.getProjectDetails();
    
  }
  getProjectDetails() {
    this.projectService.getProjects().subscribe((data:any)=>{
      this.projects=data;
      console.log(this.projects);
    });
    
  }
}