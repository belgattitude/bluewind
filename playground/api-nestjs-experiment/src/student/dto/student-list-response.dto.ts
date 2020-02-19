import { StudentEntity } from '../../entity/student.entity';

export class StudentListResponse implements NonNullable<StudentEntity> {
    id!: number;
    first_name!: string;
    last_name!: string;
}
