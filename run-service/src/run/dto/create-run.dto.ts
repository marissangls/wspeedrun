import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRunDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    run_category_id!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    vod_url!: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    run_duration!: number;
}