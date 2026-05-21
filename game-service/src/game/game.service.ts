import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService) {}

    async getAllGames() {
        return this.prisma.game.findMany();
    }

    async getGameById(id: string) {
        const game = await this.prisma.game.findUnique({
            where: { game_id: id },
            include: { run_categories: true },
        });
        if (!game) throw new NotFoundException('Game not found');
        return game;
    }

    async createGame(dto: CreateGameDto) {
        await this.prisma.game.create({
            data: {
                game_name: dto.game_name, description: dto.description,
            },
        });
        return { message: 'Game created successfully' };
    }

    async updateGame(id: string, dto: UpdateGameDto) {
        await this.prisma.game.update({
            where: { game_id: id },
            data: dto,
        });
        return { message: 'Game updated successfully' };
    }

    async deleteGame(id: string) {
        await this.prisma.runCategory.deleteMany({
            where: { game_id: id },
        });

        await this.prisma.game.delete({
            where: { game_id: id },
        });
        return { message: 'Game deleted successfully' };
}

    async getCategoryById(id: string) {
        const category = await this.prisma.runCategory.findUnique({
            where: { run_category_id: id },
        });
        if (!category) throw new NotFoundException('Category not found');
        return category;
    }

    async createCategory(dto: CreateCategoryDto) {
        const game = await this.prisma.game.findUnique({
            where: { game_id: dto.game_id },
        });
        if (!game) throw new NotFoundException('Game not found');

        await this.prisma.runCategory.create({
            data: {
                game_id: dto.game_id,run_category_name: dto.run_category_name,
            },
        });
        return { message: 'Category created successfully' };
    }

    async updateCategory(id: string, dto: UpdateCategoryDto) {
        await this.prisma.runCategory.update({
            where: { run_category_id: id },
            data: dto,
        });
        return { message: 'Category updated successfully' };
    }   

    async deleteCategory(id: string) {
        await fetch(`http://localhost:3002/runs/category/${id}`, { method: 'DELETE' });

        await this.prisma.runCategory.delete({
            where: { run_category_id: id },
        });
        return { message: 'Category deleted successfully' };
}
}