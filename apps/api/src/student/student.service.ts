import { Injectable } from '@nestjs/common';
import { StudentEntity } from '../entity/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        lastName: studentDTO.lastName,
        firstName: studentDTO.firstName,
        email: studentDTO.email,
      })
      .then(student => {
        console.log('a', student);
        //throw new Error('cool');
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
    return this.studentRepository.findOne({ id });
  }

  async search(criteria: {
    id?: number;
    fragment?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ data: StudentEntity[]; total: number }> {
    const qb = await this.studentRepository.createQueryBuilder('student');
    qb.where('1 = 1');
    if ('id' in criteria) {
      qb.andWhere('student.id = :id', { id: criteria.id });
    }

    if ('fragment' in criteria) {
      qb.andWhere('student.lastName LIKE :fragment', {
        fragment: `%${criteria.fragment}%`,
      });
    }

    const total = await qb.getCount();

    if ('limit' in criteria) {
      qb.limit(criteria.limit);
    }

    if ('offset' in criteria) {
      qb.offset(criteria.offset);
    }

    const students = await qb.getMany();

    return { data: students, total };
  }

  findAll(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }
}
