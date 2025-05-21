import { IsEmail, IsNotEmpty, isNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;


    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}

