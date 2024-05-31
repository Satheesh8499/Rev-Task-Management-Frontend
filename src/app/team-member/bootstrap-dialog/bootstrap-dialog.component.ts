import { Component, Input } from '@angular/core';
import { Task } from '../../service/task';

@Component({
  selector: 'app-bootstrap-dialog',
  templateUrl: './bootstrap-dialog.component.html',
  styleUrl: './bootstrap-dialog.component.css'
})
export class BootstrapDialogComponent {
  @Input() task: any={
    id: 0,
    name: '',
    description: '',
    assignedTo: '',
    priority: '',
    status: '',
    completedDate: null,
    labels: []
  }
}
