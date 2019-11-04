import {IsDate, IsEmail, IsOptional, IsString, Max, MaxLength} from 'class-validator';
import { Type } from 'class-transformer';
import {StudentEntity} from "../../../entity/student.entity";
import {Column, Index, PrimaryGeneratedColumn} from "typeorm";

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

    @IsString()
    @MaxLength(20)
    @IsOptional()
    phone?: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    mobile?: string;

    @IsDate()
    @IsOptional()
    birthdate?: Date;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    facebook_url?: string;

}

