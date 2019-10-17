import { IsOptional, IsString, Max, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class StudentSearchRequestDto {
    @Type(() => Number)
    id?: number;
    @IsString()
    @MaxLength(30)
    @IsOptional()
    query?: string;
    @Type(() => Number)
    @Max(3)
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
