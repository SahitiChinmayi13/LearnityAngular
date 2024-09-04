import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Feedback } from './Feedback';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  totalFeedbacks=0
  private url = "http://localhost:9999/feedback"
  constructor(private http:HttpClient, private authService: AuthService) { 
    
  }
  createFeedback(feedback:Feedback):Observable<Feedback>{
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
      return this.http.post<any>(this.url, feedback, { headers }).pipe(
        map(response => response),
        catchError(error => {
          console.error('Error creating user', error);
          return throwError(error);
        })
      );
  }
  getAllFeedback():Observable<Feedback[]>{
    const token = this.authService.getToken();
     if (!token) {
       return throwError('No token found');
     }
 
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });

     return this.http.get<any>(`${this.url}`, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching users details', error);
        return throwError(error);
      })
    );
  }
  setFeedbackLenght(totalFeedbacks:number){
    this.totalFeedbacks=totalFeedbacks;
  }
  getFeedbackLength(){
    return this.totalFeedbacks;
  }
}
