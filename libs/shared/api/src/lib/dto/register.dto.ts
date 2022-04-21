import {IsEmail, IsNotEmpty, IsString,MinLength,MaxLength} from 'class-validator';


export class RegisterDto {

    @IsEmail({}, {message: "error.invalid-email"})
    email!: string;
    
    @IsNotEmpty({ message: "error.mandatory-email" })
    password!: string;

    @IsNotEmpty({ message: "error.mandatory-password" })
    confirmPassword!: string;

    @IsString({message: "error.invalid-name"})
    lastname!: string;

    @IsString({message: "error.invalid-firstname"})
    firstname!: string;
}