import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../../service/project-service.service';




@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  showData: boolean = false;
  project: any;

  constructor(private projectService: ProjectServiceService) {}

  ngOnInit() {
    this.getProjectDetails();
  }

  getProjectDetails() {
    this.projectService.getProjectsByUserId().subscribe((data: any) => {
      // Assuming there's only one project in the data
      this.project = data;
      console.log(data);
    });
  }
  getTasksAsString(tasks: any[]): string {
    return JSON.stringify(tasks);
  }

  getMembersAsString(members: any[]): string {
    return JSON.stringify(members);
  }

  toggleData() {
    this.showData != this.showData;
  }
}