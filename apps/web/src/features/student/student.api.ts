import { classesListMock } from '../classes/classes.api';
import ky from "ky";

const pastClasses = classesListMock;

const studentListMock = [
    {
        id: 1,
        first_name: 'Sébastien',
        last_name: 'Vanvelthem',
        email: 'belgattitude@gmail.com',
        phone: '+32476421609',
        past_classes: pastClasses,
    },
    {
        id: 2,
        first_name: 'Matilde',
        last_name: 'Cegarra',
        email: 'matilde.cegarra@gmail.com',
        phone: '+32476421609',
        past_classes: pastClasses,
    },
    {
        id: 3,
        first_name: 'Sébastien',
        last_name: 'Vanvelthem',
        email: 'belgattitude@gmail.com',
        phone: '+32476421609',
        past_classes: pastClasses,
    },
];

export type StudentDetailDTO = typeof studentListMock[0];
export type StudentListDTO = StudentDetailDTO[];

const defaultApiUrl = 'http://localhost:3000';


type ApiResponse = {
    success: boolean;
    data?: unknown[] | unknown;
    error?: string;
}

// typeguard

function isApiResponse(response: any): response is ApiResponse {
    return response.success !== undefined && response.data !== undefined;
}


type SearchParams = {
    query?: string;
};


export class StudentApi {

    private apiUrl: string;

    constructor(apiUrl: string = defaultApiUrl) {
        this.apiUrl = apiUrl;
    }

    async getStudents(params: SearchParams): Promise<StudentListDTO> {
        return ky.get(`${this.apiUrl}/student`, {
        }).json().then(response => {
            if (isApiResponse(response) && response.success === true) {
                return response.data as StudentListDTO;
            }
            throw new Error('Response does not contain data');
        });
    }

    async getStudent(studentId: number): Promise<StudentDetailDTO>  {
        return ky.get(`${this.apiUrl}/student/${studentId}`, {
        }).json().then(response => {
            if (isApiResponse(response) && response.success === true) {
                return response.data as StudentDetailDTO;
            }
            throw new Error('Response does not contain data');
        });
    }
}




