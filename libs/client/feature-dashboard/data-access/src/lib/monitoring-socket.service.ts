import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';

const config: SocketIoConfig = {
  url: environment.apiUrl,
  options: {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: localStorage.getItem('CapacitorStorage.token'),
        },
      },
    },
  },
};

@Injectable({
  providedIn: 'root',
})
export class MonitoringSocketService extends Socket {
  constructor() {
    super(config);
  }
}
