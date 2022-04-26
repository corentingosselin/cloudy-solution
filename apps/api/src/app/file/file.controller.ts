import { UserToken } from "@cloudy/shared/api";
import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors,  } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { FileService } from "./file.service";

@Controller('file')
export class FileController {

    constructor(private fileService: FileService) {}

    //upload file
    @Post('')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file, @Req() request) {
        const user : UserToken = request.user;
        return this.fileService.upload(user, file);
    }

    //get user files
    @Get('list')
    @UseGuards(JwtAuthGuard)
    async list(@Req() request) {
        const user : UserToken = request.user;
        return this.fileService.list(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('preview')
    async preview(@Body('file') file: string, @Req() request) {
        const user : UserToken = request.user;
        return this.fileService.getUrlPreview(user, file);
    }




}