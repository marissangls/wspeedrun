import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('auth/register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('auth/login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get('users/:id/profile')
    getProfile(@Param('id') id: string) {
        return this.authService.getProfile(id);
    }
}