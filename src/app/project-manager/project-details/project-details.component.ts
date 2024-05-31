import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  
  projects: any[] = [];

  constructor(private restApi: RestApiService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.restApi.getProjects().subscribe({
      next: (data: any[]) => {
        this.projects = data.map(project => ({
          ...project,
          showDetails: false,
          teamMembers: [],
          tasks: []
        }));
        // Fetch team members for each project
        this.projects.forEach(project => {
          this.restApi.getTasks(project.projectID).subscribe({
            next: (tasks: any[]) => {
              project.tasks = tasks;
            },
            error: (err: any) => {
              console.error('Error loading tasks', err);
            }
          });
        });
      },
      error: (err: any) => {
        console.error('Error loading projects', err);
      }
    });
  }
  toggleDetails(project: { showDetails: boolean; }) {
    // Toggle the value of showDetails for the clicked project
    project.showDetails = !project.showDetails;
}
  // toggleDetails(project: any): void {
  //   project.showDetails = !project.showDetails;
  // }

  closeDetails(project: any): void {
    project.showDetails = false;
  }
  toggleTasks(project: any): void {
    project.showTasks = !project.showTasks;
  }

  // getTasksAsString(tasks: any[]): string {
  //   return tasks.map(task => task.taskName).join(', ');
  // }

  // getMembersAsString(members: any[]): string {
  //   return members.map(member => member.name).join(', ');
  // }

  // addTaskMember(project: any): void {
  //   const memberName = prompt('Enter the name of the task member:');
  //   if (memberName) {
  //     project.teamMembers.push({ teamMemberID: new Date().getTime(), teamMemberName: memberName });
  //   }
  // }

  // addTask(project: any): void {
  //   const taskName = prompt('Enter the name of the task:');
  //   if (taskName) {
  //     project.tasks.push({ taskID: new Date().getTime(), taskName: taskName });
  //   }
  // }

  deleteProject(project: any): void {
    if (confirm('Are you sure you want to delete this project?')) {
      // Call your delete project API here
      this.restApi.deleteProject(project.projectID).subscribe({
        next: () => {
          // Remove the project from the projects array
          const index = this.projects.findIndex(p => p.projectID === project.projectID);
          if (index !== -1) {
            this.projects.splice(index, 1);
          }
        },
        error: (err: any) => {
          console.error('Error deleting project', err);
          // Handle error
        }
      });
    }
  }

  getProject(id:number){
    console.log(this.projects[id]);
    console.log(JSON.stringify(this.projects[id]));
    return JSON.stringify(this.projects[id]);
    
  }
}
