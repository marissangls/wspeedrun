import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    run_id!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_id!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    comment!: string;
}