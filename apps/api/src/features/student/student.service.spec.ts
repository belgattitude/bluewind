import StudentService from './student.service';
import { StudentSearchRequestDto, StudentSearchResponseDto } from './student.dto';

describe('StudentService ', () => {
    test('should reply to search', async () => {
        expect.assertions(1);
        const student = new StudentService();
        const request: StudentSearchRequestDto = {
            limit: 1,
        };
        await expect(student.search(request)).resolves.toHaveProperty('success');
    });
});
