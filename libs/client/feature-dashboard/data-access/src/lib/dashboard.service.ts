import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MetricsResponse } from '@cloudy/shared/api';
import { environment } from '@env/environment';
import { firstValueFrom, Observable } from 'rxjs';
import { MonitoringSocketService } from './monitoring-socket.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private socket: MonitoringSocketService) {
  }

  getMetrics(): Observable<MetricsResponse> {
    return this.socket.fromEvent<MetricsResponse>('metrics');
  }

}
