import {IsNumber, IsString, MaxLength} from "class-validator";
import {Expose, Transform, Type} from "class-transformer";

export class StudentSearchRequestDto {
    @Type(() => Number)
    @Transform(parseInt)
    @Expose()
    id!: number;
    @IsString()
    @MaxLength(3)
    @Expose()
    query?: string;
    @IsNumber()
    @Expose()
    limit?: number;
    @IsNumber()
    @Expose()
    offset?: number;
}

export class StudentSearchResponseDto {}

export class CreateStudentDto {
    readonly last_name!: string;
    readonly first_name!: string;
    readonly email!: string;
}
