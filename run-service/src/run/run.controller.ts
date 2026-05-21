import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RunService } from './run.service';
import { CreateRunDto } from './dto/create-run.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApiExcludeEndpoint } from '@nestjs/swagger';


@ApiTags('Run')
@Controller()
export class RunController {
    constructor(private readonly runService: RunService) {}

    @Get('runs/:id/category')
    getRunsByCategory(@Param('id') id: string) {
        return this.runService.getRunsByCategory(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('runs/:id/user')
    getRunsByUser(@Param('id') id: string, @Request() req: any) {
        return this.runService.getRunsByUser(id, req.user.id);
    }

    @Get('runs/:id')
    getRunById(@Param('id') id: string) {
        return this.runService.getRunById(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('runs')
    createRun(@Body() dto: CreateRunDto, @Request() req: any) {
        return this.runService.createRun(dto, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('comments')
    createComment(@Body() dto: CreateCommentDto, @Request() req: any) {
        return this.runService.createComment(dto, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('comments/:id')
    deleteComment(@Param('id') id: string, @Request() req: any) {
        return this.runService.deleteComment(id, req.user.id);
    }

    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
    @ApiBearerAuth()
    @Get('admin/runs/:status')
    getRunsByStatus(@Param('status') status: string) {
        return this.runService.getRunsByStatus(status);
    }

    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
    @ApiBearerAuth()
    @Post('admin/runs/:id/accept')
    acceptRun(@Param('id') id: string) {
        return this.runService.acceptRun(id);
    }

    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
    @ApiBearerAuth()
    @Post('admin/runs/:id/reject')
    rejectRun(@Param('id') id: string) {
        return this.runService.rejectRun(id);
    }

    @ApiExcludeEndpoint()
    @Delete('runs/category/:id')
    deleteRunsByCategory(@Param('id') id: string) {
        return this.runService.deleteRunsByCategory(id);
    }
}