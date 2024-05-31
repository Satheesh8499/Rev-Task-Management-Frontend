import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Task } from '../service/task';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private apiUrl = 'http://localhost:3000/tasks';
  private apiURL= 'http://localhost:3000/projects';
  private ApiURL= 'http://localhost:3000/clientDetails';
  private apiURl='http://localhost:3000/users'

  constructor(private http: HttpClient) {}
   
  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  // getTasks(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  getTask(taskId: number): Observable<any> {
      
    return this.http.get<any>(`${this.apiUrl}/${taskId}`);
  }

  updateTask(taskId: number, taskData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, taskData);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiURL, project);
  }

  getProjects(): Observable<any[]> {
      const userId=localStorage.getItem('userId');
    return this.http.get<any[]>('http://localhost:8080/projects/by-project-manager/'+userId); // Change apiUrl to apiURL
  }
  

  getProject(projectId: number): Observable<any> {
         
    return this.http.get<any>(`${this.apiURL}/${projectId}`);
  }

  updateProject(projectId: number, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${projectId}`, projectData);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${projectId}`).pipe(
      catchError((error: any) => {
        console.error('Error deleting project:', error);
        // Rethrow the error or handle it as needed
        return throwError(error);
      })
    );
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURl); // Use apiURl for fetching users
  }
  
  getTeamMembers(projectID: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/${projectID}/teamMembers`);
  }

  getTasks(projectId: number): Observable<any[]> {
    const hardcodedTasks: Task[] = [
      {
        id: 1, name: 'Task 1', description: 'Description for Task 1', assignedTo: 1, priority: 'High', status: 'In Progress', startDate: new Date(), dueDate: new Date(), completedDate: null,
        projectId: 0,
        assignedBy: 0
      },
      {
        id: 2, name: 'Task 2', description: 'Description for Task 2', assignedTo: 2, priority: 'Medium', status: 'Not Started', startDate: new Date(), dueDate: new Date(), completedDate: null,
        projectId: 0,
        assignedBy: 0
      },
      // Add more tasks as needed
    ];

    // Return the hardcoded tasks as an observable
    return of(hardcodedTasks);
    //return this.http.get<any[]>(`${this.apiURL}/projects/${projectId}/tasks`);
  }

  getClientDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ApiURL}/clientDetails`);
  }
  
  
  private httpOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return { headers };
  }
}
