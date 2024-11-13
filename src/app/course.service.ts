import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './Course';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // Define separate URLs for each operation
  private baseUrl = "http://localhost:8082/courses";
  private addCourseUrl = `http://localhost:8082/courses/addCourse`;
  private fetchAllCoursesUrl = `http://localhost:8082/courses/allCourses`;
  private deleteCourseUrl = `http://localhost:8082/courses/delete`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  selectedCourse: Course = { course_id: 0, title: "", description: "", duration: "", module: 0 };

  // Method to create a new course
  createCourse(course: any): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      console.error("No token found");
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log('Course data being sent:', course); // Log course data
    return this.http.post<any>(this.addCourseUrl, course, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error creating course:', error);
        return throwError(error);
      })
    );
  }

  // Method to fetch all courses
  fetchAll(): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.fetchAllCoursesUrl, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching Courses', error);
        return throwError(error);
      })
    );
  }

  // Method to delete a course by ID
  deleteById(id: Number): Observable<void> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.deleteCourseUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error deleting course', error);
        return throwError(error);
      })
    );
  }

  // Helper methods for managing selected course
  setSelectedCourse(course: Course) {
    this.selectedCourse = course;
  }

  getSelectedCourse(): Observable<Course> {
    return of(this.selectedCourse);
  }
}
