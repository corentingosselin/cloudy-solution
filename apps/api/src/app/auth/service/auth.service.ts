import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { LoggedResponse, LoginDto, RegisterDto, User } from '@cloudy/shared/api';

@Injectable()
export class AuthService {


    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    // register user
    async register(createUserDto: RegisterDto): Promise<LoggedResponse> {

        if(createUserDto.password !== createUserDto.confirmPassword){
            throw new HttpException({
                field: "password",
                message: "error.password-not-match"
            }, HttpStatus.BAD_REQUEST);
        }

        const existingUser = await this.usersService.findUserByEmail(createUserDto.email);
        if(existingUser) throw new HttpException({
            field: "email",
            message: "error.user-already-exists"
        }, HttpStatus.BAD_REQUEST);

        const user = await this.usersService.createUser(createUserDto);

        const access_token = this.jwtService.sign({ username: user.email, userId: user.id });
        const result = { ...user, access_token, is_admin: false };
        return result;
    }

    //login user
    async login(loginUserDto: LoginDto): Promise<LoggedResponse> {
        const user = await this.usersService.findUserByEmail(loginUserDto.email);
        if (!user) {
            throw new HttpException({
                field: "email",
                message: "error.user-not-found"
            }, HttpStatus.BAD_REQUEST);

        }

        if (!await argon2.verify(user.password, loginUserDto.password)) {
            throw new HttpException({
                field: "password",
                message: "error.incorrect-password"
            }, HttpStatus.FORBIDDEN);
        }

        delete user.password;

        const access_token = this.jwtService.sign({ username: user.email, userId: user.id });
        const isAdmin = await this.usersService.isAdminById(user.id);
        const result = { ...user, access_token, is_admin: isAdmin };
        return result;
    }



}
