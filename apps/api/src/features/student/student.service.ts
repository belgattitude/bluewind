import { SearchStudentDto } from './search-students/search-student.dto';
import { CreateStudentDto } from './create-student/create-student.dto';
import { Brackets, getConnection, Repository } from 'typeorm';
import { StudentEntity } from '../../entity/student.entity';
import is from '@sindresorhus/is';
import { Result } from '@bluewind/error-flow';
import { UpdateStudentDto } from './update-student/update-student.dto';

export interface IStudentService {
    search(params: SearchStudentDto): Promise<Result<StudentEntity[]>>;
    find(id: number): Promise<Result<StudentEntity>>;
    save(studentDTO: CreateStudentDto): Promise<Result<StudentEntity>>;
    update(studentId: number, studentDTO: UpdateStudentDto): Promise<Result<StudentEntity>>;
}

class StudentService implements IStudentService {
    private studentRepo: Repository<StudentEntity>;

    constructor() {
        this.studentRepo = getConnection().getRepository(StudentEntity);
    }

    async search(params: SearchStudentDto): Promise<Result<StudentEntity[]>> {
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
                    })
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

    async save(studentDTO: CreateStudentDto): Promise<Result<StudentEntity>> {
        return await this.studentRepo
            .save({
                ...studentDTO,
            })
            .then(entity => {
                return Result.ok(entity);
            })
            .catch(e => {
                return Result.fail(`Cannot save student: ${e.message}`);
            });
    }

    async update(studentId: number, studentDTO: UpdateStudentDto): Promise<Result<StudentEntity>> {
        return await this.studentRepo
            .update(studentId, {
                ...studentDTO,
            })
            .then(async entity => {
                return await this.find(studentId);
            })
            .catch(e => {
                return Result.fail(`Cannot save student: ${e.message}`);
            });
    }
}

export default StudentService;
