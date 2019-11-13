import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import is from '@sindresorhus/is';
import ky from 'ky';
import { classesListMock } from '../../mocks/datamocks';
import { isApiResponse } from '../../core/typeguards';
import { Result } from '@bluewind/error-flow';
import { createDefaultApiService, IApiKyService } from '../../core/api/api-service';

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

type SearchParams = {
    query?: string;
};

export class StudentApi {
    private ky: typeof ky;

    constructor(apiService: IApiKyService) {
        this.ky = apiService.createKy();
    }

    async search(params: SearchParams, props: { signal?: AbortSignal }): Promise<Result<StudentDetailDTO[]>> {
        return this.ky
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
                return Result.fail(e);
            });
    }

    async get(studentId: number): Promise<StudentDetailDTO> {
        return this.ky
            .get(`api/students/${studentId}`)
            .json()
            .then(response => {
                if (isApiResponse(response) && response.success === true) {
                    return response.data as StudentDetailDTO;
                }
                throw new Error('Response is invalid or does not contain data');
            });
    }

    async save<T>(student: { id: number } & T): Promise<StudentDetailDTO> {
        console.log('save student', student);
        return this.ky
            .put(`api/students/${student.id}`, {
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
