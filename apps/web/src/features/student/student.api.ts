import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import is from '@sindresorhus/is';
import ky from 'ky';
import { classesListMock } from '../../mocks/datamocks';

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

const defaultApiUrl = 'http://localhost:3000';

type ApiResponse = {
    success: boolean;
    data?: unknown[] | unknown;
    error?: string;
};

// typeguard
function isApiResponse(response: unknown): response is ApiResponse {
    return is.plainObject(response) && response.success !== undefined && response.data !== undefined;
}

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
                afterResponse: [
                    (input, options, response) => {
                        response.headers.forEach((val, key) => {
                            console.log(key, val);
                        });
                    },
                ],
            },
        });
    }

    async getStudents(params: SearchParams): Promise<StudentDetailDTO[]> {
        return this.api
            .get('student', {
                searchParams: {
                    query: params.query || '',
                },
            })
            .json()
            .then(response => {
                if (isApiResponse(response) && response.success === true) {
                    return response.data as StudentListDTO;
                }
                throw new Error('Response does not contain data');
            });
    }

    async getStudent(studentId: number): Promise<StudentDetailDTO> {
        return this.api
            .get(`student/${studentId}`)
            .json()
            .then(response => {
                if (is.plainObject(response) && is.nonEmptyObject(response)) {
                    //const data = camelcaseKeys(response);
                    const data = response;
                    return (data as unknown) as StudentDetailDTO;
                }
                throw new Error('Response is invalid or does not contain data');
            });
    }

    async saveStudent<T>(student: {} & T): Promise<StudentDetailDTO> {
        console.log('save student', student);

        return this.api
            .post(`student`, {
                json: snakecaseKeys(student),
            })
            .json()
            .then(response => {
                if (is.plainObject(response)) {
                    const data = camelcaseKeys(response, { deep: true });
                    return (data as unknown) as StudentDetailDTO;
                }
                throw new Error('Response invalid');
            });
    }
}

export const studentApi = new StudentApi(defaultApiUrl);
