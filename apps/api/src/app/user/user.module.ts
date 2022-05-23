import { User, UserAdmin, UserBanned } from '@cloudy/shared/api';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, UserAdmin, UserBanned])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
