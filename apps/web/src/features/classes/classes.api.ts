export const classesListMock = [
    {
        id: 1,
        type: 'regular',
        level: 'all',
        label: 'Tuesday evening all levels',
        duration: 90,
        start_date: new Date(2019, 5, 1, 18, 0, 0),
        end_date: new Date(2019, 5, 1, 18, 0, 0),
        status: 'upcoming',
    },
    {
        id: 2,
        type: 'regular',
        level: 'beginner',
        label: 'Tuesday evening 2 all levels',
        duration: 90,
        start_date: new Date(2019, 5, 1, 18, 0, 0),
        end_date: new Date(2019, 5, 1, 18, 0, 0),
        status: 'open',
    },
    {
        id: 49,
        type: 'regular',
        level: 'beginner',
        label: 'Tuesday evening 3 all levels',
        duration: 90,
        start_date: new Date(2019, 5, 1, 18, 0, 0),
        end_date: new Date(2019, 5, 1, 18, 0, 0),
        status: 'cancelled',
    },
    {
        id: 3,
        type: 'regular',
        level: 'advanced',
        label: 'Tuesday evening all 4 levels',
        duration: 90,
        start_date: new Date(2019, 5, 1, 18, 0, 0),
        end_date: new Date(),
        status: 'archived',
    },
    {
        id: 4,
        type: 'regular',
        level: 'intermediate',
        label: 'Tuesday evening all 5 levels',
        duration: 90,
        start_date: new Date(2019, 5, 1, 18, 0, 0),
        end_date: new Date(),
        status: 'archived',
    },
];

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
