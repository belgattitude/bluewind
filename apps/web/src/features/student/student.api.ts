import { classesListMock } from '../classes/classes.api';

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

type SearchParams = {
    query?: string;
};

export const apiFetchStudents = async (params: SearchParams): Promise<StudentListDTO> => {
    return new Promise((resolve, reject) => {
        const { query } = params;
        if (query && query !== '') {
            const filtered = studentListMock.filter(({ first_name }) => {
                return first_name.match(new RegExp(`(.*)${query}(.*)`, 'i'));
            });
            resolve(filtered);
        }

        resolve(studentListMock);
    });
};

export const apiFetchStudent = async (studentId: number): Promise<StudentDetailDTO> => {
    return new Promise((resolve, reject) => {
        let student: StudentDetailDTO | null = null;

        for (const row of studentListMock) {
            if (row.id === studentId) {
                student = row;
                break;
            }
        }
        if (student !== null) {
            resolve(student);
        }
        reject(`Student '${studentId}' does not exists`);
    });
};
