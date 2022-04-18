import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards ,Request, BadRequestException} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "./model/user.entity";
import { UserService } from "./service/user.service";


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
    async findUser(@Res() response, @Param('id') id: string) {
        const user = await this.userService.findUser(id);
        return response.status(HttpStatus.OK).json(user);
       
    }
    
}