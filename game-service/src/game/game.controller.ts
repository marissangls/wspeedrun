import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Game')
@Controller()
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get('games')
    getAllGames() {
        return this.gameService.getAllGames();
    }

    @Get('games/:id')
    getGameById(@Param('id') id: string) {
        return this.gameService.getGameById(id);
    }

    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
    @ApiBearerAuth()
    @Post('admin/games')
    createGame(@Body() dto: CreateGameDto, @Request() req: any) {
        return this.gameService.createGame(dto);
    }

    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
    @ApiBearerAuth()
    @Patch('admin/games/:id/update')
    updateGame(@Param('id') id: string, @Body() dto: UpdateGameDto) {
        return this.gameService.updateGame(id, dto);
    }

    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
    @ApiBearerAuth()
    @Delete('admin/games/:id/delete')
    deleteGame(@Param('id') id: string) {
        return this.gameService.deleteGame(id);
    }

    @Get('categories/:id')
    getCategoryById(@Param('id') id: string) {
        return this.gameService.getCategoryById(id);
    }

    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
    @ApiBearerAuth()
    @Post('admin/categories')
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.gameService.createCategory(dto);
    }

    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
    @ApiBearerAuth()
    @Patch('admin/categories/:id/update')
    updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
        return this.gameService.updateCategory(id, dto);
    }

    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
    @ApiBearerAuth()
    @Delete('admin/categories/:id/delete')
    deleteCategory(@Param('id') id: string) {
        return this.gameService.deleteCategory(id);
    }
}