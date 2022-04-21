import { LoginDto, RegisterDto } from "@cloudy/shared/api";
import { Body, Controller, Post, Request } from "@nestjs/common";
import { AuthService } from "./service/auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @Post('register')
    async register(@Body() createUserDto: RegisterDto) {
        return this.authService.register(createUserDto);
    }
    
    //login user
    @Post('login')
    async login(@Body() loginUserDto: LoginDto) {
        return this.authService.login(loginUserDto);
    }



}