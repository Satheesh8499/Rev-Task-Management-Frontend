import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../../service/project-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Task, TaskServiceService } from '../../service/task-service.service';
import { NgForm } from '@angular/forms';
import { ElementRef } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit {
  showData: boolean = false;
  projectId!: number;
  tasks: Task[] = [];
  project: any; // Define a project object to hold project details, including team members
  selectedTask: any = {};
  detailsModalRef: NgbModalRef | undefined;

  @ViewChild('detailsModal', { static: true }) detailsModal: TemplateRef<any> | undefined;

  constructor(private route: ActivatedRoute, private projectService: ProjectServiceService, private taskService : TaskServiceService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
       this.getProjectDetails(this.projectId); // Fetch project details including team members
    });
  }
   
  toggleData() {
    this.showData = !this.showData;
  }

  getTasksForProject(projectId: number) {
    this.projectService.getTasks(projectId).subscribe((data:Task[]) => {
      this.tasks = data;
      console.log(this.tasks);
    });
  }

  getProjectDetails(projectId: number) {
    this.projectService.getProjectByProjectId(projectId).subscribe((data: any) => {
      this.project = data;
      this.tasks=this.project.tasks;
      console.log(this.project);
    });
  }

  submitTask(form: NgForm) {
    if (form.valid) {
      const newTask:Task= form.value;
      newTask.projectId=this.projectId;
      this.taskService.createTask(newTask).subscribe((data: any) => {
       
        console.log(data);
      });
      console.log(newTask);
      this.tasks.push(newTask);
      form.reset();
      console.log('Form submitted successfully:', newTask);
    } else {
      console.log('Form is invalid');
    }
  }

  openUpdateStatusModal( task: any): void {
    this.selectedTask = { ...task };
    const modalElement = document.getElementById('updateStatusModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  closeUpdateStatusModal(): void {
    const modalElement = document.getElementById('updateStatusModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  openDetailsModal(task: Task): void {
    this.selectedTask = { ...task }; // Set the selected task
    this.detailsModalRef = this.modalService.open(this.detailsModal, { centered: true }); // Open the details modal
  }

  updateTaskStatus(): void {
    this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe(() => {
      console.log(this.selectedTask);
      this.getTasksForProject(this.projectId);
    });
  }

  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        // 
        this.getTasksForProject(this.projectId);
      });
    }
  }

//   submitTask(form: NgForm) {
//     if (form.invalid) {
//       return;
//     }

//     const task: Task = {
//       name: form.value.taskName,
//       description: form.value.description,
//       priority: form.value.priority,
//       status: form.value.status,
//       startDate: form.value.startdate,
//       dueDate: form.value.duedate,
//       // projectName: form.value.projectName,
//       assignedTo: form.value.assignedto,
//       id: 0,
//       completedDate: null,
//       labels: []
//     };

//     this.restApi.createTask(task).subscribe(
//       (response) => {
//         console.log('Task created successfully:', response);
//         this.loadTask();
//         form.resetForm();
//         // Close the modal manually if needed
//         const modalElement = this.taskModal.nativeElement;
//         const modal = bootstrap.Modal.getInstance(modalElement);
//         if (modal) {
//           modal.hide();
//         }
//       },
//       (error) => {
//         console.error('Error creating task:', error);
//       }
//     );
//   }
}