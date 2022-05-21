import { UserToken } from '@cloudy/shared/api';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  //upload file
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async upload(@UploadedFiles() files , @Req() request) {
    const user: UserToken = request.user;
    return this.fileService.upload(user, files);
  }

  //get user files
  @Get('list')
  @UseGuards(JwtAuthGuard)
  async list(@Req() request) {
    const user: UserToken = request.user;
    return this.fileService.list(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('preview/:file')
  async preview(@Req() request) {
    const user: UserToken = request.user;
    const url = await this.fileService.getUrlPreview(
      user.userId + '/' + request.params.file
    );
    return { preview_url: url };
  }

  //delete
  @UseGuards(JwtAuthGuard)
  @Get('delete/:file')
  async delete(@Req() request) {
    const user: UserToken = request.user;
    const url = await this.fileService.delete(user, request.params.file);
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
