import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import is from '@sindresorhus/is';
import ky from 'ky';
import { classesListMock } from '../../mocks/datamocks';
import { isApiResponse } from '../../core/typeguards';
import { getTokenStore } from '../../core/token-store';

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

const defaultApiUrl = 'http://localhost:3000/api';

type SearchParams = {
    query?: string;
};

export class StudentApi {
    private api: typeof ky;

    constructor(apiUrl: string = defaultApiUrl) {
        this.api = ky.create({
            prefixUrl: apiUrl,
            // Debug for headers, can also transform the response
            hooks: {
                beforeRequest: [
                    (input, options) => {
                        const token = getTokenStore().getToken();
                        if (token !== null) {
                            options.headers.set('Authorization', token);
                        }
                    },
                ],
                beforeRetry: [
                    async (input, options, errors, retryCount) => {
                        const token = await ky('https://example.com/refresh-token');
                        options.headers.set('Authorization', `token ${token}`);
                    },
                ],
                afterResponse: [
                    (input, options, response) => {
                        if (response.status === 401) {
                            // This should do the trick
                            getTokenStore().removeToken();
                            window.location.reload();
                        }
                        response.headers.forEach((val, key) => {
                            console.log(key, val);
                        });
                    },
                ],
            },
        });
    }

    async search(params: SearchParams): Promise<StudentDetailDTO[]> {
        return this.api
            .get('students', {
                searchParams: {
                    query: params.query || '',
                },
            })
            .json()
            .then(response => {
                if (isApiResponse(response) && response.success === true) {
                    return response.data as StudentListDTO;
                }
                throw new Error('Response is invalid or does not contain data');
            });
    }

    async get(studentId: number): Promise<StudentDetailDTO> {
        return this.api
            .get(`students/${studentId}`)
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
            .post(`students`, {
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

export const studentApi = new StudentApi(defaultApiUrl);
