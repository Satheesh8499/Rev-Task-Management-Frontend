import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Task } from '../../service/task';
import { TaskServiceService } from '../../service/task-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapDialogComponent } from '../bootstrap-dialog/bootstrap-dialog.component';
import { ElementRef} from '@angular/core';
import { ProjectServiceService } from '../../service/project-service.service';

declare var bootstrap: any;


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @ViewChild('taskModal') taskModal!: ElementRef;


  Task: any[] = [];
  filteredTasks: any[] = [];
  selectedPriority: string = 'All';
  selectedStatus: string = 'All';
  searchQuery: string = '';
  selectedTask: any = {};
  detailsModalRef: NgbModalRef | undefined;

  @ViewChild('detailsModal', { static: true }) detailsModal: TemplateRef<any> | undefined;

  constructor(public restApi: TaskServiceService, private modalService: NgbModal, private projectService:ProjectServiceService) {}

  ngOnInit() {
    this.loadTask();
  }

  loadTask() {
    this.restApi.getTasks().subscribe((data: any) => {
      this.Task = data;
      this.filterTasks();
    });
  }

  filterTasks() {
    this.filteredTasks = this.Task.filter(task => {
      const matchesPriority = this.selectedPriority === 'All' || task.priority === this.selectedPriority;
      const matchesStatus = this.selectedStatus === 'All' || task.status === this.selectedStatus;
      const matchesSearchQuery = this.searchQuery === '' || task.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesPriority && matchesStatus && matchesSearchQuery;
    });
  }

  openUpdateStatusModal(task: any): void {
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
    this.restApi.updateTask(this.selectedTask.id, this.selectedTask).subscribe(() => {
      console.log(this.selectedTask);
      this.loadTask();
      
    });
  }

  openBootstrapModal(task: any): void {
    const modalRef = this.modalService.open(BootstrapDialogComponent);
    modalRef.componentInstance.task = task;
  }

  onSearchChange() {
    this.filterTasks();
  }
  getProjectName(id:number):string {
    return this.projectService.getProjectNameById(id);
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