import { CreateStudentDto, StudentSearchRequestDto, StudentSearchResponseDto } from './student.dto';
import { Brackets, getConnection, getManager, getRepository, Repository } from 'typeorm';
import { StudentEntity } from '../../entity/student.entity';
import is from '@sindresorhus/is';
import {Result} from "@bluewind/error-flow";


class StudentService {
    private studentRepo: Repository<StudentEntity>;

    constructor() {
        this.studentRepo = getConnection().getRepository(StudentEntity);
    }

    async search(params: StudentSearchRequestDto): Promise<Result<StudentEntity[]>> {
        const qb = this.studentRepo.createQueryBuilder('student');
        qb.where('1=1');
        if (params) {
            if ('id' in params) {
                qb.andWhere('student.id = :id', { id: params.id });
            }

            if (is.string(params.query)) {
                qb.andWhere(
                    new Brackets(subQb => {
                        const p = {
                            fragment: `%${params.query}%`,
                        };
                        subQb
                            .where('student.last_name LIKE :fragment', p)
                            .orWhere('student.first_name LIKE :fragment', p)
                            .orWhere('student.email LIKE :fragment', p);
                    }),
                );
            }
            if ('limit' in params) {
                qb.limit(params.limit);
            }
            if ('offset' in params) {
                qb.offset(params.offset);
            }
        }
        return qb
            .getManyAndCount()
            .then(([result, total]) => {
                return Result.ok(result);
            })
            .catch(error => {
                return Result.fail(`Error ${error}`);
            });
    }

    async find(id: number): Promise<Result<StudentEntity>> {
        return this.studentRepo
            .findOneOrFail(id)
            .then(response => {
                return Result.ok(response);
            })
            .catch(error => {
                return Result.fail(new Error(`Cannot find student ${id}`));
            });
    }

    async save(studentDTO: CreateStudentDto): Promise<StudentEntity> {
        const student = await this.studentRepo
            .save({
                last_name: studentDTO.last_name,
                first_name: studentDTO.first_name,
                email: studentDTO.email,
            })
            .then(entity => {
                return entity;
            });

        return student;
    }
}

export default StudentService;
