import { StudentSearchRequestDto, StudentSearchResponseDto } from './student.dto';
import { Brackets, getConnection, getRepository, Repository } from 'typeorm';
import { StudentEntity } from '../../entity/student.entity';
import is from '@sindresorhus/is';
import { queryFail, querySuccess } from '../../core/query-result';

class StudentService {
    private studentRepo: Repository<StudentEntity>;

    constructor() {
        this.studentRepo = getConnection().getRepository(StudentEntity);
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
}

export default StudentService;
