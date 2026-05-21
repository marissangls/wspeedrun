import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    run_category_name?: string;
}