import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedResponse, LoginDto, RegisterDto } from '@cloudy/shared/api';
import { AUTH_API, httpOptions } from '@cloudy/client/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  constructor(private http: HttpClient) {}

  login(login: LoginDto): Observable<LoggedResponse> {
    return this.http.post<LoggedResponse>(
      AUTH_API + 'login',
      login,
      httpOptions
    );
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
  }

  private tokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
