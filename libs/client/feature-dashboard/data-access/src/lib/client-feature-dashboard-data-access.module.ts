import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '@env/environment';


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

@NgModule({
  imports: [
    CommonModule,
     SocketIoModule.forRoot(config)
    ],
})
export class DashboardDataAccessModule {}
