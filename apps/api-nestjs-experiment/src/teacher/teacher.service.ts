import { Injectable } from '@nestjs/common';
import { TeacherEntity } from '../entity/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface Resultset {
    data: TeacherEntity[];
    total?: number;
}

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(TeacherEntity)
        private readonly teacherRepository: Repository<TeacherEntity>,
    ) {}

    async save(teacherDTO: CreateTeacherDto): Promise<TeacherEntity> {
        console.log('teacherDTO22', teacherDTO);
        const a = await this.teacherRepository
            .save({
                lastName: teacherDTO.lastName,
                firstName: teacherDTO.firstName,
                email: teacherDTO.email,
            })
            .then(teacher => {
                console.log('a', teacher);
                // throw new Error('cool');
                return teacher;
            });
        return a;
    }

    findOneById(id: number): Promise<TeacherEntity> {
        return this.teacherRepository.findOneOrFail({ id });
    }

    async search(criteria?: {
        id?: number;
        fragment?: string;
        limit?: number;
        offset?: number;
    }): Promise<{ data: TeacherEntity[]; total: number }> {
        const qb = await this.teacherRepository.createQueryBuilder('teacher');
        qb.where('1 = 1');
        if (criteria !== undefined) {
            if ('id' in criteria) {
                qb.andWhere('teacher.id = :id', { id: criteria.id });
            }

            if ('fragment' in criteria) {
                qb.andWhere('teacher.last_name LIKE :fragment', {
                    fragment: `%${criteria.fragment}%`,
                });
            }

            if ('limit' in criteria) {
                qb.limit(criteria.limit);
            }

            if ('offset' in criteria) {
                qb.offset(criteria.offset);
            }
        }
        const total = await qb.getCount();

        const teachers = await qb.getMany();

        return { data: teachers, total };
    }

    findAll(): Promise<TeacherEntity[]> {
        return this.teacherRepository.find();
    }
}
