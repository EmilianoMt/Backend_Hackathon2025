
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class LoginUserDto extends User {

    @IsString()
    @IsEmail()   
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password: string;
}