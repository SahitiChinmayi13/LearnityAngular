import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Progress } from './Progress';
import { Feedback } from './Feedback';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  progress:Progress=new Progress()
  currentModule=0
  private url = "http://localhost:8081/progress"
  constructor(private http:HttpClient, private authService: AuthService) {}

  createProgress(progress:Progress):Observable<Progress>{
    const token = this.authService.getToken();
     if (!token) {
       return throwError('No token found');
     }
 
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
     return this.http.post<any>(this.url, progress, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error creating user', error);
        return throwError(error);
      })
    );
  }

  updateProgress(id:Number,progress:Progress){
    const token = this.authService.getToken();
     if (!token) {
       return throwError('No token found');
     }
 
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
     return this.http.put<any>(`${this.url}/u/${id}`, progress, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error creating user', error);
        return throwError(error);
      })
    );
  }
  setProgress(progress:Progress){
    this.progress=progress;
  }

  getProgress(){
    return this.progress
  }
  setCurrentModule(current:number){
    this.currentModule=current;
  }
  getCurrentMofule(){
    return this.currentModule
  }
}
