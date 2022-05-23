import { MetricsResponse } from '@cloudy/shared/api';
import { Logger, UseGuards } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  OnGatewayConnection,
  OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import { first, from, Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MonitoringService } from './monitoring.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MonitoringGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private monitoringService: MonitoringService) {}

  metrics$: Observable<MetricsResponse> = from(this.monitoringService.getMetrics())
  private logger: Logger = new Logger('MonitoringGateway');

  onModuleInit() {

  }

  @Cron('*/15 * * * * *')
  fetchNewMetrics() {
    this.metrics$ = from(this.monitoringService.getMetrics());
  }

  @WebSocketServer() server: Server;
  sendMessage(metric: MetricsResponse) {
    this.server.emit('metrics', metric);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
    this.metrics$.subscribe(metric => {
      this.sendMessage(metric);
      this.logger.log('metrics updated');
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.metrics$.pipe(
      first()
    ).subscribe(metrics => {
      client.emit('metrics',metrics)
    })

  }
}
