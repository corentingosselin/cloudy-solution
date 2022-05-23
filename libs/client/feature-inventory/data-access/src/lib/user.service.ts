import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpOptions, USER_API } from '@cloudy/client/shared';
import {  UserInfoResponse } from '@cloudy/shared/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //is banned
  isBanned(userId: number): Observable<boolean> {
    return this.http.get<boolean>(USER_API + 'banned/' + userId);
  }

  isViewEnabled(userId: number): Observable<boolean> {
    return this.http.get<boolean>(USER_API + 'view/' + userId);
  }

  //ban user
  banUser(userId: number, banned: boolean): Observable<boolean> {
    return this.http.post<boolean>(
      USER_API + 'ban/',
      { banned, userId: userId },
      httpOptions
    );
  }

  //toggle view
  toggleView(userId: number, view: boolean): Observable<boolean> {
    return this.http.post<boolean>(
      USER_API + 'view/',
      { view, userId: userId },
      httpOptions
    );
  }

  //get user by id
  getUserById(userId: number): Observable<UserInfoResponse> {
    return this.http.get<UserInfoResponse>(USER_API + userId);
  }
}
