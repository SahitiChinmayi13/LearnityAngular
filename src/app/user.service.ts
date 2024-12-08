import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './User';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Course } from './Course';
import { Progress } from './Progress';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  username: string = '';
  user:User=new User;
  private apiUrl = "http://localhost:8081/user"
  
   constructor(private http: HttpClient, private authService: AuthService) { }

   // Method to fetch user details
   getUserDetails(userId: string): Observable<any> {
     const token = this.authService.getToken();
     if (!token) {
       return throwError('No token found');
     }
 
     const authToken=localStorage.getItem("authToken")
     const docoded=jwtDecode(authToken?authToken:"")
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
 
     return this.http.get<any>(`http://localhost:8081/user/username/${docoded.sub}`, { headers }).pipe(
       map(response => response),
       catchError(error => {
         console.error('Error fetching user details', error);
         return throwError(error);
       })
     );
   }
  //Fetch all the users
   getUsers():Observable<any>{
    const token = this.authService.getToken();
     if (!token) {
       return throwError('No token found');
     }
 
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
 
     return this.http.get<any>(`${this.apiUrl}`, { headers }).pipe(
       map(response => response),
       catchError(error => {
         console.error('Error fetching users details', error);
         return throwError(error);
       })
     );
  }
  
  saveUser(user: any): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
      return this.http.post<any>("http://localhost:8081/auth/signup", user, { headers }).pipe(
        map(response => {return response}),
        catchError(error => {
          console.error('Error creating user', error);
          return throwError(error);
        })
      );
  }
  
  getUserById(id:Number):Observable<any>{
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

  searchUserByUsername(username:string):Observable<any>{
    const token = this.authService.getToken();
     if (!token) {
       return throwError('No token found');
     }
 
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });

    return this.http.get(`http://localhost:8081/user/username/${username}`, { headers })
  }

  getUserRoleById(username:string):Observable<any>{
    const token = this.authService.getToken();
     if (!token) {
       return throwError('No token found');
     }
 
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
     return this.http.get<any>(`${this.apiUrl}/u/role/${username}`, { headers }).pipe(
      map(response => {return response}),
      catchError(error => {
        console.error('Error fetching users details', error);
        return throwError(error);
      })
    );
  }
  setUsername(username: string) {
    this.username = username;
    sessionStorage.setItem("username",username)
  }

  getUsername(): string {
    console.log("username:", this.username)
    return this.username;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): Observable<User> {
    // Return the stored user if it exists, otherwise fetch it
      return of(this.user);
    } 

  getUserByUserName(username:String):Observable<User>{
    const token = this.authService.getToken();
     if (!token) {
       return throwError('No token found');
     }
     const authToken=localStorage.getItem("authToken")
     const decoded=jwtDecode(authToken?authToken:"")

     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
     return this.http.get<any>(`http://localhost:8081/user/username/${decoded.sub}`, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching users details', error);
        return throwError(error);
      })
    );
    
  }

  getCourseByUserId(id:Number):Observable<Course>{
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
  getUserProgress(id:Number):Observable<Progress>{
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
}
