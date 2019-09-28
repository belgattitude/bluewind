import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TeacherEntity } from '../entity/teacher.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = jest.fn(() => ({
    metadata: {
        columns: [],
        relations: [],
    },
}));

describe('Teacher Controller', () => {
    let teacherController: TeacherController;
    let teacherService: TeacherService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TeacherService,
                {
                    provide: getRepositoryToken(TeacherEntity),
                    useClass: mockRepository,
                },
            ],
            controllers: [TeacherController],
        }).compile();

        teacherController = module.get<TeacherController>(TeacherController);
        teacherService = module.get<TeacherService>(TeacherService);
    });

    describe('search', () => {
        it('should return an array of teachers', async () => {
            const result = {
                data: [],
                total: 0,
            };
            jest.spyOn(teacherService, 'search').mockImplementation(async () => result);
            expect(await teacherController.search()).toBe(result);
        });
    });
});
