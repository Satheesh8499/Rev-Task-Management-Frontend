import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  project: any;

  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private restApi: RestApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      assignedTo: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required],
      startDate: [''], 
      completedDate: [''] // Completed date
    });
  }

  ngOnInit(): void {
    // Check if the task data is being edited (e.g., if there is an ID parameter in the route)
    const taskId = this.route.snapshot.params['id'];
    if (taskId) {
      // Load the task data using your RestApiService or any other method
      this.restApi.getTask(taskId).subscribe((task: any) => {
        // Populate the form with the task data
        this.taskForm.patchValue({
          name: task.name,
          description: task.description,
          assignedTo: task.assignedTo,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
          startDate: task.startDate, // Ensure startDate is populated
          completedDate: task.completedDate
        });
      });
    } else {
      // If not editing, set start date to today's date
      this.taskForm.patchValue({
        startDate: new Date().toISOString().split('T')[0]
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      // Update completed date if status is "Completed"
      if (this.taskForm.value.status === 'Completed') {
        this.taskForm.patchValue({
          completedDate: new Date().toISOString().split('T')[0]
        });
      }

      this.restApi.createTask(this.taskForm.value).subscribe(() => {
        this.snackBar.open('Task Created Successfully', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/view-tasks']);
      });
    }
  }
}
