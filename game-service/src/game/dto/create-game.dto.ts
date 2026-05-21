import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    game_name!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description!: string;
}