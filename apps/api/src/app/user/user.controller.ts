import { Controller, Get, HttpStatus, Param, Res, UseGuards } from "@nestjs/common";
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

    @Get('/:id')
    async findUser(@Res() response, @Param('id') id: number) {
        const user = await this.userService.findUser(id);
        return response.status(HttpStatus.OK).json(user);
       
    }
    
    
}