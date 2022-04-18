import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_API, httpOptions } from 'libs/shared/data-access/src/lib/constants/api-helpers';
import { LoginDto, RegisterDto } from '@cloudy/shared/data-access';



@Injectable()
export class AuthentificationService {
  constructor( private http: HttpClient) { }
  
  login(login: LoginDto): Observable<LoginDto> {
    return this.http.post<LoginDto>(AUTH_API + 'login', login, httpOptions);
   
  }
  register(register: RegisterDto): Observable<RegisterDto> {
    return this.http.post<RegisterDto>(AUTH_API + 'register', register, httpOptions);
  }
}