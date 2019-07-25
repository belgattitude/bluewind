import { Body, Controller, Get, Header, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';
import { StudentEntity } from '../entity/student.entity';
import { ApiResultsetInterceptor } from '../shared/interceptor/api-resultset.interceptor';
import { QueryResult } from '../core/query-result';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get()
    //@UseInterceptors(new ApiResultsetInterceptor())
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
    async save(@Body() studentDto: CreateStudentDto) {
        const a = await this.studentService.save(studentDto);
        return a;
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<StudentEntity> {
        return this.studentService.findOneById(id);
    }
}
