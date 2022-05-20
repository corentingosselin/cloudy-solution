import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UseGuards } from "@nestjs/common";
import { AdminGuard } from "../auth/guards/admin.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserService } from "./user.service";



@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Res() response) {
        const users = await this.userService.findAll();
        return response.status(HttpStatus.OK).json(users);
    }

    @UseGuards(JwtAuthGuard)
    @Get("search")
    async findUsers(@Res() response, @Query('q') input: string) {
        const users = await this.userService.findUsers(input);
        return response.status(HttpStatus.OK).json(users);
    }

    //is admin
    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get("admin/:id")
    async isAdmin(@Res() response, @Param('id') id: number) {
        const user = await this.userService.findUser(id);
        if(!user) return response.status(HttpStatus.NOT_FOUND).json({message: 'User not found'});

        const isAdmin = await this.userService.isAdmin(user);
        return response.status(HttpStatus.OK).json(isAdmin);
    }


    //set admin
    @Post("admin")
    async setAdmin(@Res() response, @Body() body) {
        const user = await this.userService.findUser(body.id);
        if(user) {
            await this.userService.setAdmin(user);
            return response.status(HttpStatus.OK).json(user);
        } else {
            return response.status(HttpStatus.NOT_FOUND).json({message: 'User not found'});
        }
    }

    @Get('/:id')
    async findUser(@Res() response, @Param('id') id: number) {
        const user = await this.userService.findUser(id);
        return response.status(HttpStatus.OK).json(user);
       
    }
    
    
}