import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '@env/environment';


const user = JSON.parse(localStorage.getItem('user')?.toString() || '{}');
const config: SocketIoConfig = {
  url: environment.socketUrl,
  options: {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: user.access_token,
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
