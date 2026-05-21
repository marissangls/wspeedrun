import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    game_id!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    run_category_name!: string;
}