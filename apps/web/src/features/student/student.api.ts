import { classesListMock } from '../classes/classes.api';
import ky from "ky";

const pastClasses = classesListMock;

const studentListMock = [
    {
        id: 1,
        first_name: 'Paul',
        last_name: 'Minster',
        email: 'paul@example.com',
        phone: '+32476421610',
        past_classes: pastClasses,
    },
    {
        id: 2,
        first_name: 'Matilde',
        last_name: 'Cegarra',
        email: 'mat@example.com',
        phone: '+32476421633',
        past_classes: pastClasses,
    },
    {
        id: 3,
        first_name: 'Jules',
        last_name: 'Beacarme',
        email: 'jules@example.com',
        phone: '+32476424455',
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

    private api: typeof ky;

    constructor(apiUrl: string = defaultApiUrl) {
        this.api = ky.create({
           prefixUrl: apiUrl
        });
    }

    async getStudents(params: SearchParams): Promise<StudentListDTO> {
        return ky.get('/student', {
        }).json().then(response => {
            if (isApiResponse(response) && response.success === true) {
                return response.data as StudentListDTO;
            }
            throw new Error('Response does not contain data');
        });
    }

    async getStudent(studentId: number): Promise<StudentDetailDTO>  {
        return ky.get(`/student/${studentId}`, {
        }).json().then(response => {
            if (isApiResponse(response) && response.success === true) {
                return response.data as StudentDetailDTO;
            }
            throw new Error('Response does not contain data');
        });
    }
}


const a = new Promise((resolve, reject) => {
    if (false) {
        resolve('cool');
    }
})


function runPromise() {
    return Promise.reject("rejection reason");
}

function foo() {
    try { // Noncompliant, the catch clause of the 'try' will not be executed for the code inside promise
        runPromise();
    } catch (e) {
        console.log("Failed to run promise", e);
    }
}


