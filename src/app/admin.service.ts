import { Injectable } from '@angular/core';
import { User } from './User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Progress } from './Progress';
import { Course } from './Course';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  username: string = '';
  user: User = new User;
  private apiUrl = "http://localhost:8081/user"

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Method to fetch user details
  getUserDetails(userId: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token found');
      return throwError('No token found');
    }

    const authToken = localStorage.getItem("authToken");
    let username: string | null = null;

    if (authToken) {
      try {
        const decoded: any = jwtDecode(authToken);
        username = decoded.sub;
      } catch (error) {
        console.error('Error decoding token:', error);
        return throwError('Invalid auth token');
      }
    }

    if (!username) {
      console.error('No username found in token');
      return throwError('No username found in token');
    }

    console.log("username", username);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/username/${username}`, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching user details', error);
        return throwError(error);
      })
    );
  }



  getUserById(id: Number): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/u/${id}`, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching users details', error);
        return throwError(error);
      })
    );
  }


  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): Observable<User> {
    // Return the stored user if it exists, otherwise fetch it
    return of(this.user);
  }


  getCourseByUserId(id: Number): Observable<Course> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/u/coursedetail/${id}`, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching users details', error);
        return throwError(error);
      })
    );

  }
  getUserProgress(id: Number): Observable<Progress> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/u/userprogress/${id}`, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching users details', error);
        return throwError(error);
      })
    );

  }
  getUserByUserName(username: String): Observable<User> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token found');
    }

    const authToken=localStorage.getItem("authToken")||"";
    const decoded=jwtDecode(authToken)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/username/${decoded.sub}`, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching users details', error);
        return throwError(error);
      })
    );
  }
}