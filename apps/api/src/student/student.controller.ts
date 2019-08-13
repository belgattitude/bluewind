import { Body, Controller, Get, Header, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';
import { StudentEntity } from '../entity/student.entity';
import { QueryResult } from '../core/query-result';
import {ApiResponseInterceptor, GenericApiResponse} from '../core/api-response-interceptor';
import {ApiCreatedResponse, ApiForbiddenResponse, ApiResponse} from '@nestjs/swagger';
import {StudentListResponse} from './dto/student-list-response.dto';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'List of all students.',
        type: StudentListResponse,
        isArray: false,
    })
    async search(): Promise<QueryResult<StudentEntity>> {
        return this.studentService.search({ fragment: '', limit: 10 });
    }

    /*
  @Get()
  async search(@Req() request: Request): Promise<StudentEntity[]> {
    const result = await this.studentService.search();
    console.log(result);
    return result;
  }*/

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    async save(@Body() studentDto: CreateStudentDto) {
        const a = await this.studentService.save(studentDto);
        return a;
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        type: StudentListResponse,
        isArray: false,
    })
    findOne(@Param('id') id: number): Promise<StudentEntity> {
        return this.studentService.findOneById(id);
    }
}
