import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MetricsResponse } from '@cloudy/shared/api';
import { MonitoringService } from './monitoring.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { from, Observable } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MonitoringGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private monitoringService: MonitoringService) {}

  metrics$: Observable<MetricsResponse>;

  onModuleInit() {}

  @Cron('*/15 * * * * *')
  fetchNewMetrics() {
    this.metrics$ = from(this.monitoringService.getMetrics());
    this.metrics$.subscribe(metric => {
        console.log(metric);
    });
    this.logger.log('updated metrics');
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MonitoringGateway');

  sendMessage(metric: MetricsResponse) {
    this.server.emit('metrics', metric);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(JwtAuthGuard)
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
