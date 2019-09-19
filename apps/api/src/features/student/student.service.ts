import { CreateStudentDto, StudentSearchRequestDto, StudentSearchResponseDto } from './student.dto';
import { Brackets, getConnection, getManager, getRepository, Repository } from 'typeorm';
import { StudentEntity } from '../../entity/student.entity';
import is from '@sindresorhus/is';
import { queryFail, querySuccess } from '../../core/query-result';

class StudentService {
    private studentRepo: Repository<StudentEntity>;

    constructor() {
        this.studentRepo = getConnection().getRepository(StudentEntity);
        // getManager().s
    }

    async search(params: StudentSearchRequestDto): Promise<StudentSearchResponseDto> {
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
                return querySuccess<StudentEntity>({ data: result, total, limit: params.limit });
            })
            .catch(error => {
                return queryFail('error');
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
