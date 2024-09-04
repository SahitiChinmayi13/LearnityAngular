import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Enrolment } from './Enrolment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EnrolmentService {
  private url = "http://localhost:9999/enrollments"
  constructor(private http:HttpClient, private authService: AuthService){}
  create(enroll:Enrolment):Observable<Enrolment>{
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.url, enroll, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error creating user', error);
        return throwError(error);
      })
    );
  }
}
