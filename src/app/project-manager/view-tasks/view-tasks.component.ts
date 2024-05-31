// // import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { RestApiService } from '../rest-api.service'; // Import your RestApiService
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-view-tasks',
//   templateUrl: './view-tasks.component.html',
//   styleUrls: ['./view-tasks.component.css']
// })
// export class ViewTasksComponent implements OnInit {
//   tasks: any[] = [];
//   showModal = false;
//   taskForm: FormGroup;
//   selectedTask: any;
//   projectId!: number; 

//   constructor(
//     private restApi: RestApiService,
//     private fb: FormBuilder,
//     private route: ActivatedRoute  // Inject ActivatedRoute to get route parameters
//   ) {
//     this.taskForm = this.fb.group({
//       name: ['', Validators.required],
//       description: [''],
//       assignedTo: [''],
//       priority: ['', Validators.required],
//       status: ['', Validators.required],
//       startDate: [''],
//       dueDate: ['', Validators.required],
//       completedDate: [''],
//       projectId: ['']
//     });
//   }

//   ngOnInit(): void {
//     // Get projectId from route parameters
//     this.route.params.subscribe(params => {
//       this.projectId = +params['projectId'];  // Convert to number if necessary
//       this.loadTasks(this.projectId);
//     });
//   }

//   loadTasks(projectId: number): void {
//     this.restApi.getTasks(projectId).subscribe({
//       next: (data: any[]) => {
//         this.tasks = data;
//       },
//       error: (err: any) => {
//         console.error('Error loading tasks', err);
//       }
//     });
//   }

//   openTaskForm(task: any): void {
//     this.selectedTask = task;
//     this.taskForm.patchValue(task);
//     this.showModal = true;
//   }

//   closeTaskForm(): void {
//     this.showModal = false;
//     this.taskForm.reset();
//   }

//   onSubmit(): void {
//     if (this.taskForm.valid) {
//       const updatedTask = { ...this.selectedTask, ...this.taskForm.value };
//       this.restApi.updateTask(updatedTask.id, updatedTask).subscribe({
//         next: () => {
//           this.loadTasks(this.projectId);
//           this.closeTaskForm();
//           alert('Task updated successfully!');
//         },
//         error: (err: any) => {
//           console.error('Error updating task', err);
//         }
//       });
//     }
//   }

//   onUpdate(task: any): void {
//     this.openTaskForm(task);
//   }

//   onDelete(taskId: number): void {
//     this.restApi.deleteTask(taskId).subscribe({
//       next: () => {
//         this.tasks = this.tasks.filter(task => task.id !== taskId);
//         alert('Task deleted successfully!');
//       },
//       error: (err: any) => {
//         console.error('Failed to delete task:', err);
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { ProjectServiceService } from '../../service/project-service.service';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  tasks: any[] = [];
  showModal = false;
   
  taskForm: FormGroup;
  selectedTask: any;
  projectId:any; 

  constructor(
    private restApi: RestApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projectService:ProjectServiceService,
    private userService:UserServiceService
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      assignedTo: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      startDate: [''],
      dueDate: ['', Validators.required],
      completedDate: [''],
      projectId: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
      this.loadTasks(this.projectId);
      console.log(params['projectId'])
      console.log(this.projectId);
    });
  }

  loadTasks(projectId: number): void {
    this.projectService.getProjectByProjectId(projectId).subscribe({
      next: (data: any) => {
        this.tasks = data.tasks;
        console.log(data);
      },
      error: (err: any) => {
        console.error('Error loading tasks', err);
      }
    });
  }

  openTaskForm(task: any): void {
    this.selectedTask = task;
    this.taskForm.patchValue(task);
    this.showModal = true;
  }

  closeTaskForm(): void {
    this.showModal = false;
    this.taskForm.reset();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask = { ...this.selectedTask, ...this.taskForm.value };
      this.restApi.updateTask(updatedTask.id, updatedTask).subscribe({
        next: () => {
          this.loadTasks(this.projectId);
          this.closeTaskForm();
          alert('Task updated successfully!');
        },
        error: (err: any) => {
          console.error('Error updating task', err);
        }
      });
    }
  }

  onUpdate(task: any): void {
    this.openTaskForm(task);
  }

  onDelete(taskId: number): void {
    this.restApi.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        alert('Task deleted successfully!');
      },
      error: (err: any) => {
        console.error('Failed to delete task:', err);
      }
    });
  }
  // getUserNameById(id:number):any{
  //        this.userService.getUserNameById(id).subscribe({
  //         next: (data: any) => {
  //           // this.tasks = data.tasks;
  //           console.log("........"+data);
  //         },
  //         error: (err: any) => {
  //           console.error('Error loading tasks', err);
  //         }
  //       });
  //     }
}
