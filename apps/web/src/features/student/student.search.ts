import { Result } from '@bluewind/error-flow';
import { getDefaultStudentApi, StudentDetailDTO } from './student.api';
import { createSearchContext } from '../../core/context/search-context';

const studentDataProvider = (): ((params: any, signal: AbortSignal) => Promise<Result<StudentDetailDTO[], Error>>) => {
    const studentApi = getDefaultStudentApi();
    return (params: any, signal: AbortSignal) => {
        return studentApi.search(params, signal);
    };
};
const { SearchProvider: StudentSearchProvider, useSearch: useStudentSearch } = createSearchContext<StudentDetailDTO>({
    dataProvider: studentDataProvider,
});

export { StudentSearchProvider, useStudentSearch };
