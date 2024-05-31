import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
// import { Task } from './task';
// import { Task } from './task-service.service';
import { User } from './user-service.service';

export interface project{
    projectID: number;
    projectName: string;
    projectDescription: string;
    projectManagerID: number;
    startDate: string;
    endDate: string;
    status: string;
    tasks: Task[];
    users?: User[];
  
}
export interface Task {
  id: number;
  projectId:number;
  taskName: string;
  taskDescription: string;
  assignedTo: number;
  priority: string;
  status: string;
  startDate: Date;
  dueDate: Date;
  completedDate: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  apiURL = 'http://localhost:8080';
  userId = localStorage.getItem('userId');
  role = localStorage.getItem('role');
constructor(private http: HttpClient) {}
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
     'userId':`${this.userId}`
  }),
};
getTasks(){
  return this.http.get<Task>('http://localhost:8080/tasks/getTasks' ,this.httpOptions)
  .pipe(retry(1),catchError(this.handleError))
}
  createTask(task:any):Observable<Task>{
    return this.http.post<any>(this.apiURL+'/tasks/create',JSON.stringify(task),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError));
  }
  updateTask(id:any,task:any):Observable<Task>{
    return this.http.put<any>('http://localhost:8080/tasks/'+id,JSON.stringify(task),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError));
  }
  deleteTask(id:any){
    return this.http.delete<Task>(this.apiURL+'/tasks/'+id, this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
}
}

