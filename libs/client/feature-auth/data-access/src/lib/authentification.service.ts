import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_API, httpOptions } from '@cloudy/client/shared';
import { LoggedResponse, LoginDto, RegisterDto } from '@cloudy/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {}

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

  //get user
  getUser(): LoggedResponse | null {
    if (localStorage.getItem('user') == null) return null;
    const user: LoggedResponse = JSON.parse(localStorage.getItem('user')!);
    if (!this.tokenExpired(user.access_token)) {
      return user;
    }
    return null;
  }

  //is admin
  isAdmin(): boolean {
    const user = this.getUser();
    if (user == null) {
      this.logout();
      return false;
    }
    return user.is_admin;
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
    this.toastr.error(this.translateService.instant('auth.logged-out'));
    this.router.navigate(['/login']);
  }

  private tokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
