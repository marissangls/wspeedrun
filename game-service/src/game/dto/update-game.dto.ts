import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGameDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    game_name?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    description?: string;
}