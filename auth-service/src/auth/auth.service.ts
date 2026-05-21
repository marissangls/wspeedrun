import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existing) {
            throw new BadRequestException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        await this.prisma.user.create({
            data: {
                username: dto.username, email: dto.email, password: hashedPassword, country: dto.country, role: 'USER',
            },
        });

        return { message: 'Registration successful' };
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({
            id: user.user_id, role: user.role,
        });

        return { access_token: token };
    }

    async getProfile(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { user_id: id },
            select: {
                username: true, email: true, country: true, role: true,
            },
        });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return user;
    }
}