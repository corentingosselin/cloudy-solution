import { UserInfoResponse } from '@cloudy/shared/api';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('search')
  async findUsers(@Res() response, @Query('q') input: string) {
    const users = await this.userService.findUsers(input);
    return response.status(HttpStatus.OK).json(users);
  }

  //is admin
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/:id')
  async isAdmin(@Res() response, @Param('id') id: number) {
    const user = await this.getUser(id);
    const isAdmin = await this.userService.isAdmin(user);
    return response.status(HttpStatus.OK).json(isAdmin);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('/:id')
  async findUser(@Res() response, @Param('id') id: number) {
    const user = await this.userService.findUser(id);
    const bannedInfo = await this.userService.getBannedInfo(user.id);
    const userInfo : UserInfoResponse= {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        banned: bannedInfo.banned,
        view: bannedInfo.view
    }
    return response.status(HttpStatus.OK).json(userInfo);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('ban')
  async banUser(@Res() response, @Body() body) {
    const banned = body.banned;
    const userId = body.userId;
    const user = await this.getUser(userId);
    if (banned) await this.userService.banUser(user);
    else await this.userService.unbanUser(user);
    return response.status(HttpStatus.OK).json({banned});
  }

  //enable view
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('view')
  async allowView(@Res() response, @Body() body) {
    const view = body.view;
    const userId = body.userId;
    const user = await this.getUser(userId);
    if (view) await this.userService.enableView(user);
    else await this.userService.disableView(user);
    return response.status(HttpStatus.OK).json({view});
  }

  //is banned
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('banned/:id')
  async isBanned(@Res() response, @Param('id') id: number) {
    const isBanned = await this.userService.isBanned(id);
    return response.status(HttpStatus.OK).json({isBanned});
  }

  //is view enabled
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('view/:id')
  async isViewEnabled(@Res() response, @Param('id') id: number) {
    const isViewEnabled = await this.userService.isViewEnabled(id);
    return response.status(HttpStatus.OK).json({isViewEnabled});
  }

  private async getUser(userId: number) {
    const user = await this.userService.findUser(userId);
    if (!user) throw new Error('User not found');
    return user;
  }
}
