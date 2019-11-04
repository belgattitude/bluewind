import {IsDate, IsEmail, IsOptional, IsString, Max, MaxLength} from 'class-validator';
import { Type } from 'class-transformer';
import {StudentEntity} from "../../../entity/student.entity";
import {Column, Index, PrimaryGeneratedColumn} from "typeorm";
import {CreateStudentDto} from "../create-student/create-student.dto";

export class UpdateStudentDto extends CreateStudentDto {


}

