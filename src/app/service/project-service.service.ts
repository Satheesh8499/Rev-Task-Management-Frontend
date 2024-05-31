import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Task } from './task-service.service';
interface Project {
  projectID: number;
  projectName: string;
  projectDescription: string;
  projectManagerID: number;
  startDate: string;
  endDate: string;
  status: string;
  tasks: Task[];
  teamMembers?: TeamMember[];
}
interface TeamMember {
  teamMemberID: number;
  teamMemberName: string;
  email: string;
  designation: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  apiURL = 'http://localhost:8080/projects';
    userId = localStorage.getItem('userId');
    role = localStorage.getItem('role');
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
         
      'Content-Type': 'application/json',
       'userId':`${this.userId}`
    }),
  };
  getProjects(): Observable<Project> {
    return this.http
      .get<Project>(this.apiURL + '/all')
      .pipe(retry(1), catchError(this.handleError));
  
  }
  getProjectsByUserId(): Observable<Project> {
      console.log('userid',this.userId);
      console.log('user role',this.role);
    return this.http
      .get<Project>(this.apiURL + '/by-task-assignee/'+this.userId)
      .pipe(retry(1), catchError(this.handleError));
  }
  createProject(project:any):Observable<Project>{
    return this.http.post<Project>(this.apiURL+'/projects',JSON.stringify(project),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError));
  }
  updateProject(id:any,project:any):Observable<Project>{
    return this.http.put<Project>(this.apiURL+'/projects/'+id,JSON.stringify(project),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError));
  }
  deleteProject(id:any){
    return this.http.delete<Project>(this.apiURL+'/projects/'+id, this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }
  getTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiURL}/projects/${projectId}/tasks`)
      .pipe(retry(1), catchError(this.handleError));
  }
  getProjectByProjectId(id:Number):any{
    return this.http
    .get<any>(this.apiURL + '/'+id)
    .pipe(retry(1), catchError(this.handleError));
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
getClientNameById(id:Number):string {
  return "Client Name";
}
getProjectDetails(projectId: number): Observable<Project> {
  return this.http.get<Project>(`${this.apiURL}/projects/${projectId}`)
    .pipe(retry(1), catchError(this.handleError));
}

updateTask(projectId: number, taskId: number, task: Task): Observable<Task> {
  return this.http.put<Task>(`${this.apiURL}/projects/${projectId}/tasks/${taskId}`, task);
}

getProjectNameById(id:Number):string {
  return "Project name"
}
}
