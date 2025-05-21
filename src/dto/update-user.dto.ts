import { IsBoolean, IsOptional, IsString, MinLength, IsEmail } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsBoolean()
    isApproved?: boolean;
    
    // Add these fields only if you want to allow updating them
    @IsOptional()
    @IsString()
    fullName?: string;
    
    @IsOptional()
    @IsEmail()
    email?: string;
    
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;
}
