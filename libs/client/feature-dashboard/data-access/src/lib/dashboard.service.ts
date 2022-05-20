import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_API } from '@cloudy/client/shared';
import { MetricsResponse, UserProfile } from '@cloudy/shared/api';
import { Socket } from 'ngx-socket-io';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private socket: Socket, private client: HttpClient) {
  }

  currentMetrics$: Observable<MetricsResponse> = this.socket.fromEvent<MetricsResponse>('metrics');

  //find users
   getUsers(input: string): Observable<UserProfile[]> {
    const result = this.client.get<UserProfile[]>(`${USER_API}search?q=${input}`);

    result.subscribe(users => console.log(users));
    return result;
  }


}
