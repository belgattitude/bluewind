import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentEntity } from '../entity/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryResultMany } from '../core/query-result';

const mockRepository = jest.fn(() => ({
    metadata: {
        columns: [],
        relations: [],
    },
}));

describe('Student Controller', () => {
    let studentController: StudentController;
    let studentService: StudentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StudentService,
                {
                    provide: getRepositoryToken(StudentEntity),
                    useClass: mockRepository,
                },
            ],
            controllers: [StudentController],
        }).compile();

        studentController = module.get<StudentController>(StudentController);
        studentService = module.get<StudentService>(StudentService);
    });

    describe('find students', () => {
        it('should return an array of students', async () => {
            const result = {
                kind: 'many',
                success: true,
                data: [],
                total: 0,
            } as QueryResultMany<StudentEntity>;
            jest.spyOn(studentService, 'search').mockImplementation(async ({}) => result);
            expect(await studentController.findAll({})).toBe(result);
        });
    });
});
