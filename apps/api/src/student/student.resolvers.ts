import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Student } from '../graphql.schema';
import { StudentGuard } from './student.guard';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

const pubSub = new PubSub();

@Resolver('Student')
export class StudentResolvers {
    constructor(private readonly studentService: StudentService) {}

    @Query()
    @UseGuards(StudentGuard)
    async getStudents() {
        return await this.studentService.findAll();
    }

    @Query('student')
    async findOneById(
        @Args('id', ParseIntPipe)
        id: number,
    ): Promise<Student> {
        return await this.studentService.findOneById(id);
    }

    @Mutation('createStudent')
    async create(
        @Args('createStudentInput') args: CreateStudentDto,
    ): Promise<Student> {
        const createdStudent = await this.studentService.save(args);
        pubSub.publish('studentCreated', { studentCreated: createdStudent });
        return createdStudent;
    }

    @Subscription('studentCreated')
    studentCreated() {
        return pubSub.asyncIterator('studentCreated');
    }
}
