import ky from "ky";
import camelcaseKeys from "camelcase-keys";
import is from "@sindresorhus/is";
import {classesListMock} from "../../mocks/datamocks";

export interface IStudentDetailDTO {
    id: number;
    firstName: string;
    lastName: string;
    birthdate: string;
    email: string;
    phone: string;
    facebookUrl: string;
    createdAt: string;
    updatedAt: string;
    pastClasses: typeof classesListMock[]
}



export type StudentListDTO = IStudentDetailDTO[];

const defaultApiUrl = 'http://localhost:3000';

type ApiResponse = {
    success: boolean;
    data?: unknown[] | unknown;
    error?: string;
}


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
                    (response) => {
                        response.headers.forEach((val, key) => {
                            console.log(key, val);
                        })
                    }
                ]
            }
        });
    }

    async getStudents(params: SearchParams): Promise<StudentListDTO> {
        return this.api.get('student', {
        }).json().then(response => {
            if (isApiResponse(response) && response.success === true) {
                return response.data as StudentListDTO;
            }
            throw new Error('Response does not contain data');
        });
    }

    async getStudent(studentId: number): Promise<IStudentDetailDTO>  {
        return this.api.get(`student/${studentId}`)
            .json().then(response => {
                if (is.plainObject(response) && is.nonEmptyObject(response)) {
                    const data = camelcaseKeys(response, {deep: true});
                    return data as unknown as IStudentDetailDTO;
                }
                throw new Error('Response is invalid or does not contain data');
            });
    }
}


