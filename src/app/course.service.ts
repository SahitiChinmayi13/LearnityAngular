import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './Course';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url ="http://localhost:9999/courses";
  constructor(private http:HttpClient,private authService: AuthService) { }
  selectedCourse: Course = {course_id:0,title:"", description:"", duration:"", module:0}
  createCourse(course:any):Observable<any>{
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.url,course, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching Courses', error);
        return throwError(error);
      })
    );
  }

  fetchAll():Observable<any>{
    const token = this.authService.getToken();
     if (!token) {
       return throwError('No token found');
     }
 
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
 
     return this.http.get<any>(this.url, { headers }).pipe(
       map(response => response),
       catchError(error => {
         console.error('Error fetching Courses', error);
         return throwError(error);
       })
     );
  }

  deleteById(id:Number):Observable<void>{
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.url}/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error deleting user', error);
        return throwError(error);
      })
    );
  }
  setSelectedCourse(course: Course) {
    this.selectedCourse = course;
  }
  
  getSelectedCourse(): Observable<Course> {
    // Return the stored course if it exists, otherwise fetch it
    
      return of(this.selectedCourse);
    }
}
