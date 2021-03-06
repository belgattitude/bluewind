import { IsDate, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStudentDto {
    @IsString()
    @MaxLength(50)
    first_name!: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    last_name?: string;

    @IsEmail()
    @MaxLength(50)
    @IsOptional()
    email?: string;

    @MaxLength(1)
    @IsOptional()
    gender?: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    phone?: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    mobile?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    avatar_url?: string;

    @IsDate()
    @IsOptional()
    birthdate?: Date;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    facebook_url?: string;
}
