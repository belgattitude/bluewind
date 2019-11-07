import StudentService from './student.service';
import { SearchStudentDto } from './search-students/search-student.dto';

describe('StudentService ', () => {
    it('should reply to search', async () => {
        const student = new StudentService();
        const request: SearchStudentDto = {
            limit: 1,
        };

        const val = ((await student.search(request)).payload as any).value;
        // await expect((result as any).value).resolves.toHaveProperty('success');
        expect(val).toBeInstanceOf(Array);
    });
});
