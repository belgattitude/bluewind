import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentEntity } from '../entity/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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

    describe('search', () => {
        it('should return an array of students', async () => {
            const result = {
                data: [],
                total: 0,
            };
            jest.spyOn(studentService, 'search').mockImplementation(
                async ({}) => result,
            );
            expect(await studentController.search()).toBe(result);
        });
    });
});
