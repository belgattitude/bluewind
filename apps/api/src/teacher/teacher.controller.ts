import {
    Body,
    Controller,
    Get,
    Header,
    Param,
    Post,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherService } from './teacher.service';
import { TeacherEntity } from '../entity/teacher.entity';
import { ApiResultsetInterceptor } from '../shared/interceptor/api-resultset.interceptor';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Get()
    //@UseInterceptors(new ApiResultsetInterceptor())
    async search(): Promise<any> {
        return this.teacherService.search({ fragment: '', limit: 10 });
    }

    /*
  @Get()
  async search(@Req() request: Request): Promise<TeacherEntity[]> {
    const result = await this.teacherService.search();
    console.log(result);
    return result;
  }*/

    @Post()
    async save(@Body() teacherDto: CreateTeacherDto) {
        const a = await this.teacherService.save(teacherDto);
        return a;
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<TeacherEntity> {
        return this.teacherService.findOneById(id);
    }
}
