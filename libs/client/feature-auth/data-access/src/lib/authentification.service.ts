import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoggedResponse, LoginDto, RegisterDto } from '@cloudy/shared/api';
import { AUTH_API, httpOptions } from '@cloudy/client/shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private http: HttpClient, private router: Router) {}

  login(login: LoginDto) : Observable<LoggedResponse>{
    return this.http.post<LoggedResponse>(AUTH_API + 'login', login, httpOptions);
  }

  register(register: RegisterDto): Observable<LoggedResponse> {
    return this.http.post<LoggedResponse>(
      AUTH_API + 'register',
      register,
      httpOptions
    );
  }

  //save user
  save(user: LoggedResponse) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get user
  getUser(): LoggedResponse | null {
    if (localStorage.getItem('user') == null) return null;
    const user: LoggedResponse = JSON.parse(localStorage.getItem('user')!);
    if (!this.tokenExpired(user.access_token)) {
      return user;
    }
    return null;
  }

  //is user logged in
  isLoggedIn(): boolean {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user')!);
      if (user && user.access_token && !this.tokenExpired(user.access_token)) {
        return true;
      }
    }
    return false;
  }

  //logout
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  private tokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
