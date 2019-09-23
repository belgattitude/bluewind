import { CreateStudentDto, StudentSearchRequestDto, StudentSearchResponseDto } from './student.dto';
import { Brackets, getConnection, getManager, getRepository, Repository } from 'typeorm';
import { StudentEntity } from '../../entity/student.entity';
import is from '@sindresorhus/is';
import {queryFail, QueryResultMany, querySuccess} from '../../core/query-result';
import {Result} from "../../core/result";

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

            if (is.string(params.fragment)) {
                qb.andWhere(
                    new Brackets(subQb => {
                        const p = {
                            fragment: `%${params.fragment}%`,
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
