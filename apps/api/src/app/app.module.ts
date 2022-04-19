import { ApiFeatureAuthFeatureModule } from '@cloudy/api/feature-auth/feature';
import { ApiFeatureUserModule } from '@cloudy/api/feature-user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ApiFeatureUserModule,
    ApiFeatureAuthFeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
