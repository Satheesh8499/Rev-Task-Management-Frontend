import { Component, OnInit } from '@angular/core';
import { Task } from '../../service/task';
import { TaskServiceService } from '../../service/task-service.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent implements OnInit{
  Task: any = [];
  constructor(public restApi: TaskServiceService) {}
  ngOnInit() {
    this.loadTask();
  }
  loadTask() {
    return this.restApi.getTasks().subscribe((data: {}) => {
      this.Task = data;
    });
  }
  deleteTask(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.deleteTask(id).subscribe((data) => {
        this.loadTask();
      });
    }
  }
    
}
