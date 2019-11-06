import { IsOptional, IsString, Max, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchStudentDto {
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
