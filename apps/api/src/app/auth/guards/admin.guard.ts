import { UserToken } from '@cloudy/shared/api';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {


    constructor(private userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: UserToken = request.user;
    console.log(token);
    return this.userService.isAdminById(token.userId);
  }
}