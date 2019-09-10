import { classesListMock } from '../../mocks/datamocks';

export type ClassesListDTO = typeof classesListMock;

export type ClassDetailDTO = ClassesListDTO[number];

export const apiFetchClasses = async (): Promise<ClassesListDTO> => {
    return new Promise((resolve, reject) => {
        resolve(classesListMock);
    });
};

export const apiFetchClass = async (classId: number): Promise<ClassDetailDTO> => {
    return new Promise((resolve, reject) => {
        let classDetail: ClassDetailDTO | null = null;

        for (const row of classesListMock) {
            if (row.id === classId) {
                classDetail = row;
                break;
            }
        }
        if (classDetail !== null) {
            resolve(classDetail);
        }
        reject(`Class '${classId}' does not exists`);
    });
};
