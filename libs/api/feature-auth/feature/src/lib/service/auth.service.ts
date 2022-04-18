import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/user/dto/CreateUser.dto';
import { User } from 'src/user/model/user.entity';
import { LoginUserDto } from 'src/user/dto/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    // register user
    async register(createUserDto: CreateUserDto): Promise<User> {

        if(createUserDto.password !== createUserDto.confirmPassword){
            throw new HttpException({
                field: "password",
                message: "error.password-not-match"
            }, HttpStatus.BAD_REQUEST);
        }

        const existingUser = this.usersService.findUserByEmail(createUserDto.email);
        if(existingUser) throw new HttpException({
            field: "email",
            message: "error.user-already-exists"
        }, HttpStatus.BAD_REQUEST);

        const user = await this.usersService.createUser(createUserDto);
        return user;
    }

    //login user
    async login(loginUserDto: LoginUserDto): Promise<any> {
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
        const result = { ...user, access_token };
        return result;
    }



}
