import { UserToken } from '@cloudy/shared/api';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ViewGuard } from '../auth/guards/view.guard';
import { AuthService } from '../auth/service/auth.service';
import { UserService } from '../user/user.service';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(
    private fileService: FileService,
    private userService: UserService
  ) {}

  //upload file
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async upload(@UploadedFiles() files, @Req() request) {
    const user: UserToken = request.user;
    return this.fileService.upload(user, files);
  }

  //get user files
  @Get('list')
  @UseGuards(JwtAuthGuard, ViewGuard)
  async list(@Req() request) {
    const user: UserToken = request.user;
    return this.fileService.list(user);
  }

  //get user files by user id
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('list/:userId')
  async listByUserId(@Req() request) {
    const userId = request.params.userId;
    return this.fileService.listByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('preview/:file')
  async preview(@Req() request, @Query('user') userId?: number) {
    const user: UserToken = request.user;
    if (await this.userService.isAdminById(user.userId)) {
      if (!userId) {
        throw new HttpException({}, HttpStatus.FORBIDDEN);
      }
      const url = await this.fileService.getUrlPreview(
        userId + '/' + request.params.file
      );
      return { preview_url: url };
    }

    const url = await this.fileService.getUrlPreview(
      user.userId + '/' + request.params.file
    );
    return { preview_url: url };
  }

  //delete
  @UseGuards(JwtAuthGuard)
  @Get('delete/:file')
  async delete(@Req() request, @Query('user') userId?: number) {
    const user: UserToken = request.user;

    if (await this.userService.isAdminById(user.userId)) {
      if (!userId) {
        throw new HttpException({}, HttpStatus.FORBIDDEN);
      }
      this.fileService.deleteByUserId(userId, request.params.file);
      return { deleted: true };
    }

    this.fileService.delete(user, request.params.file);
    return { deleted: true };
  }

  //duplicate
  @UseGuards(JwtAuthGuard)
  @Post('duplicate/:file')
  async duplicate(@Req() request) {
    const user: UserToken = request.user;
    return this.fileService.duplicate(user, request.params.file);
  }
}
