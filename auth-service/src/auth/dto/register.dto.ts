import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(40)
    username!: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty()
    @IsString()
    country!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(40)
    @IsStrongPassword({
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password!: string;
}