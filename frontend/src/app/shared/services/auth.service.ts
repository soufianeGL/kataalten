import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private hasToken(): boolean {
    return this.isBrowser() && !!localStorage.getItem('accessToken');
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (this.isBrowser()) {
          this.storeToken(response.accessToken);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('accessToken');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  private storeToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('accessToken', token);
    }
  }

  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap(() => {
        console.log('User registered successfully!');
        // Optionally, you can navigate the user to the login page after registration.
        this.router.navigate(['/auth/login']);
      })
    );
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('accessToken') : null;
  }
}
