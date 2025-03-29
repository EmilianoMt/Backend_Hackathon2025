import {
    IsEmail,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
    @IsString()
    name: string;
  
    @IsString()
    lastName: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password: string;
  
    @IsString()
    @IsOptional()
    userPhoto?: string;
}
