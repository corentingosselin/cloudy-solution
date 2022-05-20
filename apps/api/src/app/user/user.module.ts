import { User, UserAdmin } from '@cloudy/shared/api';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, UserAdmin])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
