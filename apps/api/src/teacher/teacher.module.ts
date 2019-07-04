import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from '../entity/teacher.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TeacherEntity])],
    controllers: [TeacherController],
    providers: [TeacherService],
    exports: [TeacherService],
})
export class TeacherModule {}
