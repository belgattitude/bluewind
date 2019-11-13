import { Result } from '@bluewind/error-flow';
import { getDefaultStudentApi, StudentDetailDTO } from './student.api';
import { createSearchContext } from '../../core/context/search-context';

const studentDataProvider = (): ((
    params: any,
    props: { signal: AbortSignal }
) => Promise<Result<StudentDetailDTO[], Error>>) => {
    const studentApi = getDefaultStudentApi();
    return (params: any, props: { signal: AbortSignal }) => {
        return studentApi.search(params, { signal: props.signal });
    };
};
const { SearchProvider: StudentSearchProvider, useSearch } = createSearchContext<StudentDetailDTO>({
    dataProvider: studentDataProvider,
});

export { StudentSearchProvider, useSearch as useStudentSearch };
