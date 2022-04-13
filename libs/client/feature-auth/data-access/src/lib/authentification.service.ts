import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from '../dto/login.dto';

const AUTH_API = 'http://localhost:3000/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthentificationService {
  constructor( private http: HttpClient) { }
  
  login(email: string, password: string): Observable<LoginDto> {
    return this.http.post<LoginDto>(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
   
  }
  register(email: string, password: string, confirm_password : string, ): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      email,
      password,
      confirm_password
    }, httpOptions);
  }
}