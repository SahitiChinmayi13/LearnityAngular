import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  expiresIn: number;
  role: string;
  // Include other fields as needed, such as user info
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:9999/auth/login';
  private tokenKey = 'authToken';
  private expiresAtKey = 'expiresAt';
  private role = '';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken()  && !this.isTokenExpired());


  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password })
      .pipe(
        map(response => {
          this.storeToken(response.token, response.expiresIn, response.role);
          this.isAuthenticatedSubject.next(true);
          return true;
        }),
        catchError(() => {
          this.isAuthenticatedSubject.next(false);
          return [false];
        })
      );
  }

  logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']); // Redirect to login or any other page
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private storeToken(token: string, expiresIn: number, role:string): void {
    localStorage.setItem(this.tokenKey, token);
    const expiresAt = new Date().getTime() + expiresIn * 1000; // Convert seconds to milliseconds
    localStorage.setItem(this.expiresAtKey, expiresAt.toString());
    localStorage.setItem(this.role, role);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expiresAtKey);
    localStorage.removeItem(this.role)
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private isTokenExpired(): boolean {
    const expiresAt = localStorage.getItem(this.expiresAtKey);
    if (!expiresAt) {
      return true;
    }
    return new Date().getTime() > parseInt(expiresAt, 10);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null{
    return localStorage.getItem(this.role);
  }
}