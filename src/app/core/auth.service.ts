import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/users/login'; // Update the URL to your backend endpoint

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(this.loginUrl, body, { headers }).pipe(
      tap(response => {
        if (response) {
          console.log('log in method........');
          this.storeUserDetails(response.userId, username, response.role);
          this.navigateBasedOnRole(response.role);
           console.log(response);
        }
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  private storeUserDetails(id:string, username: string, role: string): void {
    console.log('suser',id);
    console.log('role',role);
    localStorage.setItem('userId', id);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    console.log('userId',localStorage.getItem('userId'));
  }

  private navigateBasedOnRole(role: string): void {
    //console.log(role);
    if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (role === 'Project Manager') {
      //this.router.navigate(['/admin']);
      this.router.navigate(['/manager']);
    } else if (role === 'Team Member') {
      this.router.navigate(['/team-member']);
    }
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  getRole():any{
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('userId'); // Assuming the user ID or some token is used for authorization
    return new HttpHeaders({
      'Content-Type': 'application/json',
       'userId':`${token}`
    });
  }

  getUserData(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>('http://localhost:8080/users/me', { headers }).pipe(
      catchError(this.handleError<any>('getUserData'))
    );
  }
}
