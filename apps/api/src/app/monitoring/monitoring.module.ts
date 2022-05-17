import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MonitoringGateway } from './monitoring.gateway';
import { MonitoringService } from './monitoring.service';


@Module({
  providers: [MonitoringGateway,MonitoringService],
  imports: [
    HttpModule,
    UserModule
  ],
  controllers: [],
})
export class MonitorModule {}
