import { SharedUtilsModule } from '@cloudy/shared/utils';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    SharedUtilsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
