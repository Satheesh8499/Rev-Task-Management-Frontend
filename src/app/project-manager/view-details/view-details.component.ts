import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../../service/project-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  showData: boolean = false;
  project: any ; // Initialize as an empty object
  projectId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectServiceService
  ) {}

  ngOnInit() {
    // Use the router's current navigation to access the state object

      // Retrieve project details from route data
      const navigation = window.history.state;
      this.project = navigation.project;
      this.projectId=this.project.id;
      console.log(this.project)
      console.log(this.projectId)
    }
  

  // getProjectDetails(projectId: number) {
  //   this.projectService.getProjectById(projectId).subscribe((data: any) => {
  //     this.projects = data;
  //   });
  // }

  getTasksAsString(tasks: any[]): string {
     return JSON.stringify(tasks);

  }

  toggleData() {
    this.showData = !this.showData;
  }
  // generatePieChart(): void {
  //   const project = this.data.project;
  //   const pieChartId = 'taskPieChart';
  //   const pieChartCanvas = document.getElementById(pieChartId) as HTMLCanvasElement;

  //   if (pieChartCanvas) {
  //     const taskStatusCounts = this.countTaskStatuses(project.tasks);
  //     const labels = Object.keys(taskStatusCounts);
  //     const data = Object.values(taskStatusCounts);

  //     new Chart(pieChartCanvas, {
  //       type: 'pie',
  //       data: {
  //         labels: labels,
  //         datasets: [{
  //           data: data,
  //           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] // Define your own colors
  //         }]
  //       }
  //     });
  //   }
  // }

  // countTaskStatuses(tasks: any[]): Record<string, number> {
  //   const counts: Record<string, number> = {
  //     'Completed': 0,
  //     'In Progress': 0,
  //     'Not Started': 0
  //   };

  //   tasks.forEach(task => {
  //     counts[task.status] = (counts[task.status] || 0) + 1;
  //   });

  //   return counts;
  // }
  

  generatePieChart(): void {
    console.log('Generating task pie chart for project:');
    const project = this.project;
    console.log('Project:', project);
    const pieChartId = 'taskPieChart' + project.projectID;
    const pieChartCanvas = document.getElementById(pieChartId) as HTMLCanvasElement;
  
    if (pieChartCanvas) {
      const taskStatusCounts = this.countTaskStatuses(project.tasks);
      console.log('Task Status Counts:', taskStatusCounts);
      const labels = Object.keys(taskStatusCounts);
      const data = Object.values(taskStatusCounts);
  
      new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] // You can define your own colors
          }]
        }
      });
    }
  }
  
  
  countTaskStatuses(tasks: any[]): Record<string, number> {
    const counts: Record<string, number> = {};
  
    tasks.forEach(task => {
      counts[task.status] = (counts[task.status] || 0) + 1;
    });
  
    return counts;
  }  

  
}
