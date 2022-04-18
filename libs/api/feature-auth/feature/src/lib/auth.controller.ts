import { Body, Controller, Post, Request } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/CreateUser.dto";
import { LoginUserDto } from "src/user/dto/LoginUser.dto";
import { AuthService } from "./service/auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }
    
    //login user
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }



}