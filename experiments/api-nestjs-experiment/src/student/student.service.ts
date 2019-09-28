import { Inject, Injectable } from '@nestjs/common';
import { StudentEntity } from '../entity/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { queryFail, QueryResult, QueryResultError, querySuccess } from '../core/query-result';
import is from '@sindresorhus/is';

interface Resultset {
    data: StudentEntity[];
    total?: number;
}

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private readonly studentRepository: Repository<StudentEntity>,
    ) {}

    async save(studentDTO: CreateStudentDto): Promise<StudentEntity> {
        const a = await this.studentRepository
            .save({
                last_name: studentDTO.last_name,
                first_name: studentDTO.first_name,
                email: studentDTO.email,
            })
            .then(student => {
                console.log('a', student);
                // throw new Error('cool');
                return student;
            });
        return a;

        /*
        this.studentRepository.save(
            {
                lastName: studentDTO.lastName,
                firstName: studentDTO.firstName,
                email: studentDTO.email,
            }
        ).then();

        const studentEntity = (async () => ( await this.findOneById(1) ))()

        return Result.ok<StudentEntity>(studentEntity);
        */
    }

    findOneById(id: number): Promise<StudentEntity> {
        return this.studentRepository.findOneOrFail({ id });
    }

    async search(criteria: {
        id?: number;
        fragment?: string;
        limit?: number;
        offset?: number;
    }): Promise<QueryResult<StudentEntity>> {
        const qb = this.studentRepository.createQueryBuilder('student');
        qb.where('1=1');
        if (criteria) {
            if ('id' in criteria) {
                qb.andWhere('student.id = :id', { id: criteria.id });
            }
            if (is.string(criteria.fragment)) {
                const params = {
                    fragment: `%${criteria.fragment}%`,
                };
                qb.andWhere(
                    new Brackets(subQb => {
                        subQb
                            .where('student.last_name LIKE :fragment', params)
                            .orWhere('student.first_name LIKE :fragment', params)
                            .orWhere('student.email LIKE :fragment', params);
                    }),
                );
            }
            if ('limit' in criteria) {
                qb.limit(criteria.limit);
            }
            if ('offset' in criteria) {
                qb.offset(criteria.offset);
            }
        }
        console.log(qb.getSql());
        const p = qb
            .getManyAndCount()
            .then(([result, total]) => {
                return querySuccess<StudentEntity>({ data: result, total, limit: criteria.limit });
            })
            .catch(error => {
                return queryFail('error');
            });

        return p;
    }

    findAll(): Promise<[StudentEntity[], number]> {
        return this.studentRepository.findAndCount({});
    }
}
