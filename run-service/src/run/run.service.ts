import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRunDto } from './dto/create-run.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class RunService {
    constructor(private prisma: PrismaService) {}

    formatDuration(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours} Hour(s) ${minutes} Minute(s) ${secs} Second(s)`;
    }

    async getRunsByCategory(categoryId: string) {
        const runs = await this.prisma.run.findMany({
            where: { run_category_id: categoryId },
            orderBy: { run_duration: 'asc' },
        });

        const result = await Promise.all(runs.map(async (run) => {
            const userRes = await fetch(`http://localhost:3000/users/${run.user_id}/profile`);
            const userData = userRes.ok ? await userRes.json() : null;

            const categoryRes = await fetch(`http://localhost:3001/categories/${run.run_category_id}`);
            const categoryData = categoryRes.ok ? await categoryRes.json() : null;

            let gameData = null;
            if (categoryData?.game_id) {
                const gameRes = await fetch(`http://localhost:3001/games/${categoryData.game_id}`);
                gameData = gameRes.ok ? await gameRes.json() : null;
            }

            return {
                ...run,
                run_duration: this.formatDuration(Number(run.run_duration)),
                runner: userData,
                category: categoryData,
                game: gameData,
            };
        }));

        return result;
    }

    async getRunsByUser(userId: string, requesterId: string) {
        const runs = userId === requesterId
        ? await this.prisma.run.findMany({ where: { user_id: userId } })
        : await this.prisma.run.findMany({ where: { user_id: userId, status: 'ACCEPTED' } });

        return Promise.all(runs.map(async (run) => {
            const categoryRes = await fetch(`http://localhost:3001/categories/${run.run_category_id}`);
            const categoryData = categoryRes.ok ? await categoryRes.json() : null;

            return {
                ...run,
                run_duration: Number(run.run_duration),
                category: categoryData,
            };
        }));
    }

    async getRunById(id: string) {
        const run = await this.prisma.run.findUnique({
            where: { run_id: id },
            include: { comments: true },
        });
        if (!run) throw new NotFoundException('Run not found');

        const userRes = await fetch(`http://localhost:3000/users/${run.user_id}/profile`);
        const userData = userRes.ok ? await userRes.json() : null;

        const categoryRes = await fetch(`http://localhost:3001/categories/${run.run_category_id}`);
        const categoryData = categoryRes.ok ? await categoryRes.json() : null;

        let gameData = null;
        if (categoryData?.game_id) {
            const gameRes = await fetch(`http://localhost:3001/games/${categoryData.game_id}`);
            gameData = gameRes.ok ? await gameRes.json() : null;
        }

        return {
            ...run,
            run_duration: Number(run.run_duration),
            runner: userData,
            category: categoryData,
            game: gameData,
        };
    }

    async createRun(dto: CreateRunDto, userId: string) {
        const categoryRes = await fetch(`http://localhost:3001/categories/${dto.run_category_id}`);
        if (!categoryRes.ok) {
            throw new NotFoundException('Run category not found');
        }

        await this.prisma.run.create({
            data: {
            run_category_id: dto.run_category_id,
            user_id: userId,
            vod_url: dto.vod_url,
            run_duration: dto.run_duration,
            submitted_at: new Date(),
            status: 'PENDING',
            },
        });
        return { message: 'Run submitted successfully' };
    }

    async createComment(dto: CreateCommentDto, requesterId: string) {
        if (dto.user_id !== requesterId) {
            throw new ForbiddenException('Cannot comment as another user');
        }

        const run = await this.prisma.run.findUnique({ where: { run_id: dto.run_id } });
        if (!run) throw new NotFoundException('Run not found');

        const userRes = await fetch(`http://localhost:3000/users/${dto.user_id}/profile`);
        if (!userRes.ok) {
            throw new NotFoundException('User not found');
        }

        await this.prisma.comment.create({
            data: {
                run_id: dto.run_id,
                user_id: dto.user_id,
                comment: dto.comment,
                created_at: new Date(),
            },
        });
    return { message: 'Comment created successfully' };
    }

    async deleteComment(commentId: string, requesterId: string) {
        const comment = await this.prisma.comment.findUnique({ where: { comment_id: commentId } });
        if (!comment) throw new NotFoundException('Comment not found');
        if (comment.user_id !== requesterId) throw new ForbiddenException('Cannot delete another user comment');

        await this.prisma.comment.delete({ where: { comment_id: commentId } });
        return { message: 'Comment deleted successfully' };
    }

    async getRunsByStatus(status: string) {
        const runs = await this.prisma.run.findMany({ where: { status } });
        return runs.map(run => ({ ...run, run_duration: Number(run.run_duration) }));
    }

    async acceptRun(id: string) {
        await this.prisma.run.update({
            where: { run_id: id },
            data: { status: 'ACCEPTED', verified_at: new Date() },
        });
        return { message: 'Run accepted successfully' };
    }

    async rejectRun(id: string) {
        await this.prisma.run.update({
            where: { run_id: id },
            data: { status: 'REJECTED', verified_at: new Date() },
        });
        return { message: 'Run rejected successfully' };
    }

    async deleteRunsByCategory(categoryId: string) {
        const runs = await this.prisma.run.findMany({
            where: { run_category_id: categoryId },
        });

        for (const run of runs) {
            await this.prisma.comment.deleteMany({
                where: { run_id: run.run_id },
            });
        }

        await this.prisma.run.deleteMany({
            where: { run_category_id: categoryId },
        });
    }
}