import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import is from '@sindresorhus/is';
import ky from 'ky';
import { classesListMock } from '../../mocks/datamocks';
import { isApiResponse } from '../../core/typeguards';
import { Result } from '@bluewind/error-flow';
import { createDefaultApiService, IApiService } from '../../core/api/api-service';

export interface StudentDetailDTO {
    id: number;
    first_name: string;
    last_name: string;
    birthdate: string;
    email: string;
    phone: string;
    facebook_url: string;
    created_at: string;
    updated_at: string;
    pastClasses: typeof classesListMock;
}

export type StudentListDTO = StudentDetailDTO[];

type SearchParams = {
    query?: string;
};

export class StudentApi {
    private api: typeof ky;

    constructor(apiService: IApiService) {
        this.api = apiService.createKy();
    }

    async search(params: SearchParams, props: { signal?: AbortSignal }): Promise<Result<StudentDetailDTO[]>> {
        return this.api
            .get('api/students', {
                signal: props.signal,
                //credentials: "include",
                searchParams: {
                    query: params.query || '',
                },
            })
            .json()

            .then(response => {
                if (isApiResponse(response) && response.success === true) {
                    return Result.ok(response.data as StudentDetailDTO[]);
                }
                return Result.fail<StudentDetailDTO[]>(new Error('Response is invalid or does not contain data'));
            })
            .catch(e => {
                if (e.name === 'AbortError') {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve(Result.fail(new Error(`WARNING Aborted ${e.name}`)));
                        }, 100);
                    });
                }
                throw e;
            });
    }

    async get(studentId: number): Promise<StudentDetailDTO> {
        return this.api
            .get(`api/students/${studentId}`)
            .json()
            .then(response => {
                if (isApiResponse(response) && response.success === true) {
                    return response.data as StudentDetailDTO;
                }
                throw new Error('Response is invalid or does not contain data');
            });
    }

    async save<T>(student: {} & T): Promise<StudentDetailDTO> {
        console.log('save student', student);

        return this.api
            .post(`api/students`, {
                json: snakecaseKeys(student),
            })
            .json()
            .then(response => {
                if (is.plainObject(response)) {
                    const data = camelcaseKeys(response, { deep: true });
                    return (data as unknown) as StudentDetailDTO;
                }
                throw new Error(`Invalid response`);
            });
    }
}

export const getDefaultStudentApi = () => new StudentApi(createDefaultApiService());
