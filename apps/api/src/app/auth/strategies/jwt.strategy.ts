import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: any) {
    if(await this.userService.isBanned(payload.userId))
      throw  new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'error.user-banned'
      }, HttpStatus.FORBIDDEN);
    return { userId: payload.userId, username: payload.username };
  }
}