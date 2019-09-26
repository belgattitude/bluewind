import { IsNumber, IsOptional, IsString, Max, MaxLength } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';

export class StudentSearchRequestDto {
    @Type(() => Number)
    id!: number;
    @IsString()
    @MaxLength(3)
    @IsOptional()
    query?: string;
    @Type(() => Number)
    @Max(150)
    limit?: number;
    @Type(() => Number)
    offset?: number;
}

export class StudentSearchResponseDto {}

export class CreateStudentDto {
    readonly last_name!: string;
    readonly first_name!: string;
    readonly email!: string;
}
