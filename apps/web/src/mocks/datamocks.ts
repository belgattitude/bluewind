
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

const pastClasses = classesListMock;

export const studentListMock = [
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
